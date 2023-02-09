const ChatRoom = require('../Models/RoomTemplate')
const ChatMessage = require('../Models/MessageTemplate')
const ChatUser = require('../Models/UserTemplate')

exports.createMessage = async (req, res, callBack) => {
    console.table(req)
    if (!req.body || !req.body._id) {
        console.log(req)
        return res.status(401).send({ message: 'Unauthorized' })
    }
    const userId = req.body._id
    const { sentdate, content, roomId } = req.body
    const newMessage = new ChatMessage({ sentby: userId, sentdate, content, roomId })

    newMessage.save((error, data) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ message: "Message Sent", messageId: data._id })
            ChatRoom.findOneAndUpdate({ _id: roomId }, { $push: { messages: data._id } }, { new: true }, (error, room) => {
                if (error) return res.status(500).send(error)
                res.status(200).json({ message: `Message Added to Room ${room._id}` })
            
            })
        }
    })
}