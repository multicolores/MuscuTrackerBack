const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv/config");

app.use(express.json());
app.use(cors());

// Import Routes
const authRoute = require("./routes/auth");
// const workoutRoute = require("./routes/workouts");
// const exerciseRoute = require("./routes/exercises");
// const trainingRoute = require("./routes/trainings");

app.use("/", authRoute);
// app.use("/workout", workoutRoute);
// app.use("/exercise", exerciseRoute);
// app.use("/training", trainingRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("App available on http://localhost:" + PORT);
});

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to the db !")
);
