const Post = require('../models/Post');
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
    }
}

module.exports = postController;