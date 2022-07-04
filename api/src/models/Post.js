const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    userId: {
        type: String,
    },
    desc: {
        type: String,
        required: true
    },
    likes: [],
    image: String,
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post