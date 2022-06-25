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
    likes: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String,
}, {
    timestamp: true
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post