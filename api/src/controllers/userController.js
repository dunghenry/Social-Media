const User = require('../models/User');
const logEvents = require("../helpers/logEvents")
const userController = {
    getUsers: async(req, res)=>{
        try {
            const users = await User.find({});
            const newUsers = users.map(user =>{
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
            await logEvents(error.message, module.filename)
        }
    },
    getUser: async(req, res)=>{
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            const {password, ...others} = user._doc;
            if(!user){
                return res.status(404).json("User does not exist")
            }
            return res.status(200).json(others);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
        }
    },
    updateUser: async(req, res)=>{
        try {
            const id = req.params.id;
            const user = await User.findByIdAndUpdate(id, {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: `${req.body.firstname} ${req.body.lastname}`,
            }, {new: true});
            return res.status(200).json(user);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
        }
    },
    deleteUser: async(req, res)=>{
        try {
            const id = req.params.id;
            await User.findByIdAndDelete(id);
            return res.status(200).json("Deleted user successfully")
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
        }
    }

}

module.exports = userController;