const mongoose = require('mongoose')
const ChatMessage = require('../Models/MessageTemplate')
const userSchema = new mongoose.Schema({
    userfirstname: {
        type: String,
        required: true
    },
    userlastname: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserTemplate", userSchema)