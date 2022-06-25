const User = require("../models/User");
const logEvents = require("../helpers/logEvents");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authController = {
    generatedAccessToken: (user) => {
        return jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30m",
            }
        );
    },
    generatedRefreshToken: (user) => {
        return jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "365d",
            }
        );
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
                password: hashed,
            });
            const savedUser = await newUser.save();
            const { password, ...info } = savedUser._doc;
            return res.status(201).json(info);
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    login: async (req, res) => {
        const { username } = req.body;
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json("Username does not exist.");
            }
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isValidPassword) {
                return res.status(400).json("Incorrect password.");
            }
            const { password, ...info } = user._doc;
            const accessToken = authController.generatedAccessToken(user);
            const refreshToken = authController.generatedRefreshToken(user);

            //Add refreshToken from db
            refreshTokens.push(refreshToken);

            //Add refreshToken from cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
            });
            if (user && isValidPassword) {
                return res.status(200).json({ ...info, accessToken });
            }
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    requestRefreshToken: async (req, res) => {
        try {
            //Get refreshToken from cookies
            const refreshToken = req.cookies.refreshToken;
            // console.log(refreshToken)
            if (!refreshToken)
                return res.status(401).json("You're not authenticated");
            //Check refreshToken from db
            if (!refreshTokens.includes(refreshToken)) {
                return res.status(403).json("Refresh token is not valid");
            }
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (error, user) => {
                    if (error?.name === "TokenExpiredError") {
                        return res.status(403).json("Token is expired!");
                    } else if (error) {
                        return res.status(403).json("Token is not valid!");
                    }
                    //Remove used refreshToken
                    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

                    //Generate accessToken new and refreshToken new
                    const newAccessToken = authController.generatedAccessToken(user);
                    const newRefreshToken = authController.generatedRefreshToken(user);

                    //Save refreshToken new from db
                    refreshTokens.push(newRefreshToken);

                    //Add refreshToken from cookie
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        path: "/",
                        sameSite: "strict"
                    })
                    return res.status(201).json({accessToken: newAccessToken, refreshToken: newRefreshToken})
                }
            );
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    logOut: async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
            return res.status(200).json("Logged out successfully!");
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
};

module.exports = authController;
