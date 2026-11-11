
const mongoose = require('mongoose')
const Message = require('../models/message.model')
const { emitToUser } = require('../socket/index.js')

// POST /api/messages/:receiverId
async function sendMessage(req, res) {
    try {
        const senderId = req.user._id
        const { receiverId } = req.params
        const { text } = req.body

        if (!mongoose.isValidObjectId(receiverId)) {
            return res.status(400).json({ message: 'Invalid receiver id' })
        }

        if (!text || !text.trim()) {
            return res.status(400).json({ message: 'Message text is required' })
        }

        if (String(senderId) === receiverId) {
            return res.status(400).json({ message: 'You cannot message yourself' })
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            text: text.trim()
        })

        emitToUser(receiverId, 'newMessage', newMessage)

        return res.status(201).json({ message: newMessage })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Failed to send message' })
    }
}


// GET /api/messages/:userId
async function getConversation(req, res) {
    try {
        const myId = req.user._id
        const { userId } = req.params

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userId },
                { sender: userId, receiver: myId }
            ]
        }).sort({ createdAt: 1 })

        await Message.updateMany(
            {
                sender: userId,
                receiver: myId,
                read: false
            },
            {
                $set: { read: true }
            }
        )

        return res.json({ messages })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Failed to fetch messages' })
    }
}

module.exports = {
    sendMessage,
    getConversation
}
