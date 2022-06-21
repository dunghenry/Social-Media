const User = require('../models/User');
const logEvents = require('../helpers/logEvents');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {
    generatedAccessToken: (user) => {
        return jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20m'
        })
    },
    generatedRefreshToken: (user) => {
        return jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '365d'
        })
    },
    register: async (req, res) => {
        const { firstname, lastname } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                firstname,
                lastname,
                username: `${firstname} ${lastname}`,
                password: hashed
            });
            const savedUser = await newUser.save();
            const { password, ...info } = savedUser._doc;
            return res.status(201).json(info);
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
        }
    },
    login: async (req, res) => {
        const { username } = req.body;
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json("Username does not exist.");
            }
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isValidPassword) {
                return res.status(400).json("Incorrect password.")
            }
            const {password, ...info} = user._doc
            if (user && isValidPassword) {
                return res.status(200).json(info)
            }
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
        }
    },
    requestRefreshToken: async (req, res) => {
        
    }
}

module.exports = authController