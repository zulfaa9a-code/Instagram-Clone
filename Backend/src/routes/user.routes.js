const express = require('express')
const userRouter = express.Router()
const identifyUser = require('../middlewares/auth.middleware')
const  {
    getallUsersController,
    followUserController,
    unfollowUserController
}  = require('../controllers/user.controller')
/**
 * @route post /api/users/follow/:userid
 * @description follow a user
 * 
 * @access private
 */
userRouter.post("/follow/:userid", identifyUser, followUserController)
userRouter.delete("/unfollow/:userid", identifyUser, unfollowUserController)
userRouter.get("/", identifyUser, getallUsersController)
module.exports = userRouter;