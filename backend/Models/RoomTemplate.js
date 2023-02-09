const mongoose = require('mongoose')
const MessageTemplate = require('./MessageTemplate')
const UserTemplate = require('./UserTemplate')

const messageSchema = [{}]
const participantSchema = [{}]

const roomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        required: true,
        unique: true
    },
    participants: {
        type: participantSchema,
        ref: UserTemplate,
        required: true
    },
    messages:
        [{
            type: mongoose.Types.ObjectId,
            ref: "MessageTemplate"
        }]
})

module.exports = mongoose.model("RoomTemplate", roomSchema)