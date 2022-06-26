const User = require('../models/User');
const logEvents = require("../helpers/logEvents");
const bcrypt = require('bcrypt');
const userController = {
    getUsers: async (req, res) => {
        const query = req.query.new;
        try {
            const users = query ? await User.find({}).sort({ _id: -1 }).limit(5) : await User.find();
            const newUsers = users.map(user => {
                return {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    followers: user.followers,
                    following: user.following
                }
            })
            return res.status(200).json(newUsers);
        } catch (error) {
            console.log(error.message)
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getUserStats: async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } }, //gte >=
                {$project: {month: {$month: "$createdAt"}}},
                {$group: {_id: "$month", total: {$sum: 1}}}
            ])
            return res.status(200).json(data);
        } catch (error) {
            console.log(error.message)
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            const { password, ...others } = user._doc;
            if (!user) {
                return res.status(404).json("User does not exist");
            }
            return res.status(200).json(others);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const { password } = req.body;
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await User.findByIdAndUpdate(id, {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: `${req.body.firstname} ${req.body.lastname}`,
                password: req.body.password
            }, { new: true });
            return res.status(200).json(user);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            await User.findByIdAndDelete(id);
            return res.status(200).json("Deleted user successfully");
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    followAndUnfollow: async(req, res) =>{
        const id = req.params.id;
        const {userId} = req.user;
        try {
            if(userId === id){
                return res.status(403).json("Action forbidden");
            }
            else{
                const followUser = await User.findById(id);
                const followingUser = await User.findById(userId); //current user
                if(!followUser.followers.includes(userId)){
                    await followUser.updateOne({$push: {followers: userId}});
                    await followingUser.updateOne({$push: {following: id}});
                    return res.status(200).json("Followed user successfully");
                }
                else{
                    await followUser.updateOne({$pull: {followers: userId}});
                    await followingUser.updateOne({$pull: {following: id}});
                    return res.status(200).json("Unfollowed user successfully");
                }
            }
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }

}

module.exports = userController;