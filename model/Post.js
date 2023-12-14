const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;