const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

module.exports = mongoose.model("User", userSchema);