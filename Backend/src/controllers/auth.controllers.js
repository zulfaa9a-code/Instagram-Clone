const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt= require('bcryptjs');
const crypto = require('crypto')
async function registerController(req,res) {
    
    const {username,name,email,password,bio, profileImg}=req.body;
  /*  const isUserExistsByEmail=await userModel.findOne({email})
    if(isUserExistsByEmail)
    {
        return res.status(409).json({
            message:"Email taken."
        })
    }
    const isUserExistsByUsername= await userModel.findOne({username})
    if(isUserExistsByUsername)
    {
        return res(409).json({
            message:"Username already exists."
        })
    }*/
   const isUserExists= await userModel.findOne({
    $or:[{username},{email}]
   })
   if(isUserExists)
   {
    return res.status(409).json(
        { message: isUserExists.email === email
      ? "Email taken."
      : "Username taken."
        }
    )
   }
   const hash =await bcrypt.hash(password, 10);
   const user =await userModel.create({
    username, name, email, bio, profileImg, password:hash
   })
   const token = jwt.sign(
    { id: user._id , username: user.username},
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);
   res.cookie("token", token)
   res.status(201).json({
    message:"User registered successfully",
    user:{
        email:user.email, username:user.username, bio:user.bio, profileImg:user.profileImg
    }
   })
}
async function loginController(req,res) {
    const {username,email, password}=req.body;
    const user = await userModel.findOne({
        $or:[{
            username:username,
        },
    {
        email:email
    }]
    }).select("+password")
    if(!user)
    {
        return res.status(404).json({
            message:"User not found"
        })
    }
  //crypto.createHash('sha256').update(password).digest('hex')
  const hashedpassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(password, hashedpassword)
    if(!isPasswordValid)
    {
        return res.status(401).json({
            message:"Passwod Invalid"
        })
    }
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
         
        message:"User Logged in successfully",
        user: {
            username:user.username, email:user.email, bio:user.bio
        }
    })
}
async function getMeController(req,res) {
    const userId=   req.user.id;
    const user = await userModel.findById(userId)
    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
    res.status(200).json({
        message:"User fetched successfully",
        user: {
            username:user.username, email:user.email, bio:user.bio
        }
    })
}

module.exports={registerController,loginController , getMeController}