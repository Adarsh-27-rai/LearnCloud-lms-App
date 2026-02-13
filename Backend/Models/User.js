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
        enums: ["Teacher","Student","Admin"]
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User", UserSchema);