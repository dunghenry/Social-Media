const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const logEvents = require("../helpers/logEvents");
const postController = {
    createPost: async (req, res) =>{
        try {
            const post = req.body;
            const newPost = new Post({
                ...post,
                userId: req.user.userId,
            })
            const savedPost = await newPost.save();
            return res.status(201).json(savedPost);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    updatePost: async (req, res) =>{
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if(req.user.userId === post.userId || req.user.isAdmin){
                const updatePost = await Post.findByIdAndUpdate(id, req.body, {new: true})
                return res.status(200).json(updatePost);
            }
            else{
                return res.status(401).json("You're not authenticated");
            }
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    deletePost: async (req, res) =>{
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if(req.user.userId === post.userId || req.user.isAdmin){
                await Post.findByIdAndDelete(id);
                return res.status(200).json("Deleted post successfully");
            }
            else{
                return res.status(401).json("You're not authenticated");
            }
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getPosts: async (req, res) =>{
        try {
            const posts = await Post.find({});
            return res.status(200).json(posts);
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getPost: async (req, res) =>{
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if(req.user.userId === post.userId || req.user.isAdmin){
                return res.status(200).json(post);
            }
            else{
                return res.status(401).json("You're not authenticated");
            }
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    likeAndDislike: async(req, res) => {
        const id = req.params.id;
        const {userId} = req.user;
        try {
            const post = await Post.findById(id);
            if(!post.likes.includes(userId)) {
                await post.updateOne({$push: {likes: userId}})
                return res.status(200).json("Post liked successfully");
            }
            else{
                await post.updateOne({$pull: {likes: userId}})
                return res.status(200).json("Post disliked successfully");
            }
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getTimelinePosts: async (req, res) => {
        const {userId} = req.user;
        try {
            const currentUserPosts = await Post.find({userId: userId}).sort({'createdAt': -1});
            // console.log(currentUserPosts);
            const followingPosts = await User.aggregate([
                {
                  $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                  },
                },
                {
                  $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                  },
                },
                {
                  $project: {
                    followingPosts: 1,
                    _id: 0,
                  },
                },
              ]);
            const data = followingPosts
            // console.log(data[0])
            return res.status(200).json(currentUserPosts.concat(...data[0].followingPosts).sort((a, b) =>{
                return b.createdAt - a.createdAt;
            }));
    
        } catch (error) {
            console.log(error.message);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
}

module.exports = postController;