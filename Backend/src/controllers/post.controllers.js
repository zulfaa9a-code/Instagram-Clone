const postModel= require('../models/post.model')
const likeModel = require('../models/like.model')
const jwt = require('jsonwebtoken')
const ImageKit= require("@imagekit/nodejs")
const {toFile}= require("@imagekit/nodejs")
const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req, res)
{
    console.log(req.user)
 try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image."
            });
        }

        const file = await imagekit.files.upload({
            file: await toFile(req.file.buffer, req.file.originalname || "post.jpg"),
            fileName: req.file.originalname || "post.jpg"
        });

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: req.user.id
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to create post"
        });
    }
}
async function getPostDetails(req,res)
{
   
    const userId = decoded.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(post)
    {
        return res.status(404).json({
            message:"Post not found"
        })
    }
    const isValidUser= post.user=== userId
    if (!isValidUser)
    {
        return res.status(403).json({
            message:"Unauthorized access"
        })
    }
    return res.status(200).json({
        message:"Post fectched successfully",
        post
    })
}
async function likePostController(req,res)
{
    const username = req.user.username
        const postId = req.params.postId
        const post = await postModel.findById(postId)
        if(!post)
        {
            return res.status(404).json({message:"Post not found"})
        }
        const like = await likeModel.create({
            postId: postId,
            user: username
        })
        res.status(201).json({
            message:"Post liked successfully",
        })
}
async function getFeedController(req,res)
{
    const posts = await postModel
        .find({})
        .populate("user", "-password");

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
}
module.exports = {
    createPostController,
    getPostDetails , likePostController , getFeedController
};