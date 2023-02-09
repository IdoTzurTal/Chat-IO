const ChatUser = require("../Models/UserTemplate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { userfirstname, userlastname, useremail, userpassword } = req.body
    const hash = await bcrypt.hash(userpassword, 5)
    const newChatUser = new ChatUser({ userfirstname, userlastname, useremail, userpassword: hash })
    newChatUser.save((error, user) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ message: "New User Created" })
        }
    })
}

exports.login = (req, res) => {
    console.log(req.body)
    ChatUser.findOne({
        useremail: req.body.useremail
    },
        (error, user) => {
            console.log(user)
            if (error) {
                res.status(500).json(error)
                console.log(error)
            }
            else if (user == null) {
                res.status(400).json({ message: "No Such User Found" })
            }
            else {bcrypt.compare(req.body.userpassword, user.userpassword, (error, isMatch) => {
                if (error || !isMatch) {
                    res.status(406).json ({ message: "Encryption Error" })
                }
                else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
                    res.json({ token, _id: user._id })
                }
            })
        }}
    )
}