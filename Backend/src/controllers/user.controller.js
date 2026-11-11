
const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function getallUsersController(req, res) {
    try {
        const users = await userModel.find({
            _id: { $ne: req.user.id }
        }).select("username profileImg")


console.log("Users after excluding yourself:", users.length)
        res.status(200).json({
            message: "Users fetched successfully",
            users
        })

    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        })
    }
    
}
async function followUserController(req, res) {
    try {
        const follower = req.user.id;
        const following = req.params.userid;

        if (follower === following) {
            return res.status(400).json({
                message: "You cannot follow yourself."
            });
        }

        // Check whether the target user exists
        const targetUser = await userModel.findById(following);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Check whether the relationship already exists
        const isAlreadyFollowing = await followModel.findOne({
            follower,
            following
        });

        if (isAlreadyFollowing) {
            return res.status(409).json({
                message: "You are already following this user."
            });
        }

        const followRecord = await followModel.create({
            follower,
            following
        });
         await userModel.findByIdAndUpdate(following, {
    $addToSet: { followers: follower }
});
        await userModel.findByIdAndUpdate(follower, {
    $addToSet: { following: following }
});



        return res.status(201).json({
            message: "User followed successfully.",
            followRecord
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong while following the user."
        });
    }
}

async function unfollowUserController(req, res) {
    try {
        const follower = req.user.id;
        const following = req.params.userid;

        const followRecord = await followModel.findOne({
            follower,
            following
        });

        if (!followRecord) {
            return res.status(404).json({
                message: "You are not following this user."
            });
        }

        await followModel.findByIdAndDelete(followRecord._id);
        await userModel.findByIdAndUpdate(following, {
            $pull: { followers: follower }
        });

        return res.status(200).json({
            message: "User unfollowed successfully."
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong while unfollowing the user."
        });
    }
}

module.exports = {  
     getallUsersController,
    followUserController,
    unfollowUserController
};
