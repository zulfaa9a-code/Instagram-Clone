const mongoose = require('mongoose');
const followSchema = mongoose.Schema({
    follower: { type: String, ref: "users", required: true },
    following: { type: String, ref: "users", required: true },
    status:{
        type:String, default:"pending", 
        enum:{
            values:["pending","accepted","rejected"],
            message:"Status must be either pending, accepted or rejected"
        }
    }}, { timestamps: true });
    followSchema.index({ follower: 1, following: 1 }, { unique: true });
module.exports = mongoose.model("follows", followSchema);