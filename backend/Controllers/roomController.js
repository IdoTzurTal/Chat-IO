const ChatRoom = require("../Models/RoomTemplate")
const ChatUser = require("../Models/UserTemplate")
const ChatMessage = require("../Models/MessageTemplate")

exports.createRoom = async (req, res) => {
    const { roomname, participants, messages } = req.body
    const newChatRoom = new ChatRoom({ roomname, participants, messages })
    newChatRoom.save((error, room) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ message: "New Room Created" })
        }
    })
}

exports.joinRoom = (req, res) => {
    console.log(req.body)
    ChatRoom.findOne({
        roomname: req.body.roomname
    },
        (error, room) => {
            console.log(room)
            if (error) {
                res.status(500).json(error)
                console.log(error)
            }
            else if (room == null) {
                res.status(400).json({ message: "This Room Doesn't Exist" })
            }
            else {
                res.json({ room, message: `Welcome to Room ${req.body.roomname}` })
            }
        }
    )
}

exports.getRoomMessages = (req, res) => {
    ChatRoom.findById(req.params.id, (error, room) => {
        if (error) return res.status(500).send(error)
        if (!room) return res.status(404).send('Room Not Found')
        if (!messages) return res.status(403).send('No Messages to Display in the Selected Room')
        res.status(200).json({
            message: `Room ${ room } Messages Downloaded`,
            messages: room.messages
    })
})
    }