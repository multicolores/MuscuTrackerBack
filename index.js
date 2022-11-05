const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const mongoose = require("mongoose");
require("dotenv/config");

app.use(express.json());
app.use(cors());

const authRoute = require("./routes/auth");
const workoutRoute = require("./routes/workouts");

app.use("/", authRoute);
app.use("/workout", workoutRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("App available on http://localhost:" + PORT);
});

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to the db !")
);
