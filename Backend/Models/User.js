const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "Student",
        enum: ["Teacher","Student","Admin"]
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    createdCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ]
})

module.exports = mongoose.model("User", UserSchema);