const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    sentby: {
        type: String,
        required: true
    },
    sentdate: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("MessageTemplate", messageSchema)