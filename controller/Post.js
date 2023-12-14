
const Post = require('../model/Post');
const mongoose = require('mongoose');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
const createPost = async(req,res) => {
    try {
        const { content } = req.body;
        const newPost = new Post({
            content: content,
            username: req.user.username
        });
        const savedPost = await newPost.save();
        console.log(savedPost); 

        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const { content, comments, likes } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
        const post = await Post.findById(id);
        post.content = content;
        post.comments = comments; 
        post.likes = likes;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
        const post = await Post.findById(id);
        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createPost, updatePost, getAllPosts, deletePost };

