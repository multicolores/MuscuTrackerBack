const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const { registerValidation, loginValidation } = require("../validationJoi");

// Create a user
router.post("/register", async (req, res) => {
  //* Validate data before we create a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //* Checking if the user is already in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //* Hash password with bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //* Creat new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    workout: req.body.workout,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//-- Login as a user
router.post("/login", async (req, res) => {
  //* Validate data before we create a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //* Checking if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  //* Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //* Create and assign a token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

//-- Get every users ( possible only if we have an auth-token)
router.get("/getusers", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//--Get the user corresponding with our token)
router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ user: user, token: req.user });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a user
router.patch("/user/:userid", verify, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userid },
      { $set: { workout: req.body.workout } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
