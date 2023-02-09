const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('../backend/Controllers/authController')
const roomController = require('../backend/Controllers/roomController')
const messageController = require('../backend/Controllers/messageController')
require('dotenv').config()

mongoose.connect('mongodb+srv://Idotzurtal1:Idotzurtal1@chat-io.pbtklem.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Connection to Database Successfull"))
    .catch(error => {
        console.log("Connection Failed")
        console.log(error)
    })

const io = require('socket.io')(2003, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on("connect", (socket) => {
    console.log(`Connected to socket with id: ${socket.id}`)
    socket.on("message", (messageValue, Room) => {
        console.log(messageValue)
        if (Room === '') {
            console.log('The Room', Room)
            socket.broadcast.emit('print-message', {content: messageValue, sentby: sentby})
            // socket.on('print-message', messageValue, sentby)
        }
        else {
            socket.to(Room).emit('print-message', messageValue)
        }
    })

    socket.on('join-room', (Room, callBack) => {
        socket.join(Room);
        callBack(Room)
    })
})
// Login.jsx page - Register link, media links, make the login button contained within the background? I
// Navbar - Make each button clicked highlighted like the default state of the 'Home' button. I
// Chat - Make the sender appear as well as the message/ delete the ':' before the messages. 
// MessageController - The 'createMessage' function is getting user = undefined. 
// MongoDB - Add messages to the rooms (push them into the messages array in the rooms collection). 
// MongoDB - Use Postman to add messages to the messages collection (fix the 'createMessage function). 

app.use(express.json())
app.use(cors())
app.post("/register", authController.register)
app.post("/login", authController.login)
app.post("/createRoom", roomController.createRoom)
app.post("/joinRoom", roomController.joinRoom)
app.post("/createMessage", messageController.createMessage)
app.get("/getRoomMessages", roomController.getRoomMessages)
app.post("/updateRoom", roomController.updateRoom)
app.listen(2002, () => console.log("Listening on port 2002"))