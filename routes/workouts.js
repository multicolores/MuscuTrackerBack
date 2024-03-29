const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const verify = require("./verifyToken");

//Get every workouts
router.get("/", verify, async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.json({ message: err });
    }
});

//Get a Specific workout
router.get("/:workoutid", verify, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutid);
        res.json(workout);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post a workout
router.post("/", verify, async (req, res) => {
    const workout = new Workout({
        name: req.body.name,
        exercise: req.body.exercise,
        description: req.body.description,
    });
    try {
        const savedworkout = await workout.save();
        res.json(workout);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a workout
router.delete("/:workoutid", verify, async (req, res) => {
    try {
        const removeWorkout = await Workout.deleteOne({
            _id: req.params.workoutid,
        });
        res.json(removeWorkout);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a workout
router.patch("/:workoutid", verify, async (req, res) => {
    try {
        const updatedWorkout = await Workout.updateOne(
            { _id: req.params.workoutid },
            { $set: { exercise: req.body.exercise, date: req.body.date } }
        );
        res.json(updatedWorkout);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
