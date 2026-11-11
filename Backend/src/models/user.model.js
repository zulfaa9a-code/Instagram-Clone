const mongoose= require('mongoose')
const userSchema =  mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username taken"],
        required:[true, "Username is required"]
    },
    name :String,
    email:{
        type:String, 
        unique:[true,"Email already exists"],
        required:[true,"Email is required"]
    },
    password:
    {
        type:String, select:false,
        required:[true,"Password is required"]
    },
    bio : String,
    profileImg:{
        type:String, default :"https://ik.imagekit.io/0glkknafc/0f691cd77a8c6d90f07b35c10c95668f.webp"
    },
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"users"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"users"}]  
})
const userModel = mongoose.model("users",userSchema)
module.exports= userModel;