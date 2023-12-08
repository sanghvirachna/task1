const express = require('express');
const {signupUser , loginUser ,forgetPassword} = require('../controller/User.js');
const router = express.Router();
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);
router.post('/user/forget-password',forgetPassword);


module.exports = router;