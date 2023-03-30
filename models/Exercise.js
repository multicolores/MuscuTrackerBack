const mongoose = require("mongoose");

const ExerciseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    muscle: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: false,
    },
    description: {
        type: String,
        require: false,
    },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
