
const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')

const messageRoutes = express.Router()
const messageController = require('../controllers/message.controllers')

messageRoutes.get('/:userId', identifyUser, messageController.getConversation)

messageRoutes.post('/:receiverId', identifyUser, messageController.sendMessage)

module.exports = messageRoutes
