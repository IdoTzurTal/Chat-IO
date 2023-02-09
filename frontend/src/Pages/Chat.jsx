import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import axios from 'axios'

const socket = io("http://localhost:2003")

export default function Chat() {

    const [messageValue, setMessageValue] = useState("")
    const [messages, setMessages] = useState([])
    const [Room, setRoom] = useState()
    const [currentRoom, setCurrentRoom] = useState("")
    const [user, setUser] = useState({
        token: '',
        _id: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        const _id = localStorage.getItem('id')
        if (!token || !_id) {
            console.error('Token or id Not Found')
            return
        }
        setUser({
            token,
            _id
        })
    }, [])

    // socket.emit("message", messageValue, (messageValue) => {
    //     console.log({ messageValue })
    //     setMessageValue(messageValue)
    // })

    useEffect(() => {
        socket.on("connect", () => console.log("Socket Connected"))
        socket.on("print-message", (x) => {
            console.log(x)
        })
        return () => {
            socket.off("connect", () => console.log("disconnected"))
            socket.off("print-message", () => console.log("Message Sent"))
        }
    }, [])

    useEffect(() => {
        const populateMessages = async () => {
            if (!currentRoom) return
            try {
                const result = await axios.get(`http://localhost:2002/getRoomMessages/${currentRoom}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setMessages(result.data)
            } catch (error) {
                console.error(error)
            }
        }
        populateMessages()
    }, [currentRoom, user.token])

    const handleClick = async () => {
        const sentby = user.userfirstname
        setMessages([...messages, { content: messageValue, sentby }])
        socket.emit('print-message', { content: messageValue, sentby: sentby })
        socket.on('print-message', message=>{

        })
        socket.emit('message', {
            sentby: sentby,
            sentdate: new Date(),
            content: messageValue,
        }, "my first room")
        // let result = await axios.post('http://localhost:2002/createMessage', {
            // sentby: sentby,
            // sentdate: new Date(),
            // content: messageValue,
        // })
        //     .catch((err) => console.log(err))
        // console.table(result.data)
    }

    function join() {
        socket.emit('join-room', Room, () => setCurrentRoom(Room))
    }

    return (
        <div className="p-10">
            <input
                className="border border-gray-400 p-2 w-full"
                onChange={(e) => setMessageValue(e.target.value)}
                type="text"
                placeholder="Message"
            />
            <input
                className="border border-gray-400 p-2 mt-2 w-full"
                onChange={(e) => setRoom(e.target.value)}
                type="text"
                placeholder="Type Room Name"
            />
            <div className="flex mt-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={join}
                >
                    Join
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleClick}
                >
                    Send
                </button>
            </div>
            {currentRoom && (
                <p className="mt-4 text-xl font-bold">Joined Room {currentRoom}</p>
            )}
            {messages.map((message, index) => (
                <p key={index} className="mt-4">
                    {message.sentby}: {message.content}
                </p>
            ))}
        </div>

    )
}