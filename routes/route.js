const express = require('express');
const {signupUser , loginUser ,forgetPassword} = require('../controller/User.js');
const {createPost,updatePost,getAllPosts,deletePost} = require('../controller/Post.js');
const  {authenticate} = require('../common.js');



const router = express.Router();
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);
router.post('/user/forget-password',forgetPassword);


//Post API's
router.get('/user/getallposts', authenticate ,getAllPosts);
router.post('/user/newpost', authenticate, createPost);
router.put('/user/updatepost/:id', authenticate, updatePost);
router.delete('/user/deletepost/:id', authenticate, deletePost);


module.exports = router;