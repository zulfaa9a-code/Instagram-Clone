const express= require("express")
const postRouter= express.Router()
const postController = require('../controllers/post.controllers')
const identifyUser= require('../middlewares/auth.middleware')
const multer=require("multer");
const upload = multer({storage:multer.memoryStorage()})
//file handling
postRouter.post('/',upload.single("imgUrl"),identifyUser ,postController.createPostController)
postRouter.get('/',identifyUser ,postController.getPostDetails)

postRouter.get('/details/:postId', identifyUser, postController.getPostDetails)
postRouter.post('/like/:postId', identifyUser, postController.likePostController)
/* 
@route GET /api/posts/feed
@description get all the post in the DB
@acess private 
*/
postRouter.get("/feed",identifyUser, postController.getFeedController)
module.exports=postRouter;