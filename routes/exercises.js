const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");
const verify = require("./verifyToken");

//Get every exercises or exercise of muscle
router.get("/", verify, async (req, res) => {
    if (req.query.muscle) {
        let selectedMuscle = req.query.muscle;
        try {
            const exercises = await Exercise.find();
            let exercisesArrayToReturn = [];
            exercises.map((exo) => {
                if (exo.muscle.includes(selectedMuscle))
                    exercisesArrayToReturn.push(exo);
            });
            res.json(exercisesArrayToReturn);
        } catch (err) {
            res.json({ message: err });
        }
    } else {
        try {
            const exercises = await Exercise.find();
            res.json(exercises);
        } catch (err) {
            res.json({ message: err });
        }
    }
});

//Get a Specific exercise
router.get("/:exerciseid", verify, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseid);
        res.json(exercise);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post an exercise
router.post("/", verify, async (req, res) => {
    const exercise = new Exercise({
        name: req.body.name,
        muscle: req.body.muscle,
        image: req.body.image,
        description: req.body.description,
    });
    try {
        const savedExercise = await exercise.save();
        res.json(exercise);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete an exercise
router.delete("/:exerciseid", verify, async (req, res) => {
    try {
        const removeExercise = await Exercise.deleteOne({
            _id: req.params.exerciseid,
        });
        res.json(removeExercise);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update an exercise
router.patch("/:exerciseid", verify, async (req, res) => {
    try {
        const updatedExercise = await Exercise.updateOne(
            { _id: req.params.exerciseid },
            {
                $set: {
                    muscle: req.body.muscle,
                    image: req.body.image,
                    description: req.body.description,
                },
            }
        );
        res.json(updatedExercise);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
