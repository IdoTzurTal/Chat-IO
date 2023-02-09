const ChatRoom = require('../Models/RoomTemplate')
const ChatMessage = require('../Models/MessageTemplate')
const ChatUser = require('../Models/UserTemplate')

exports.createMessage = async (req, res) => {
    // console.table(req.user)
    // console.table(req.user._id)
    if (!req.user || !req.user._id) {
        return res.status(401).send({ message: 'Unauthorized' })
    }
    const userId = req.user._id
    const { sentdate, content, roomId } = req.body
    const newMessage = new ChatMessage({ sentby: userId, sentdate, content, roomId })
    newMessage.save((error, message) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ message: "Message Sent" })
        }
    })
}