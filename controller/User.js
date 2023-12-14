const userModel = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "12345"

const signupUser = async (req,res) => {
    const {username,email,password} = req.body;
    
    try{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        })
        const token = jwt.sign({username:result.username,id:result._id},SECRET_KEY);
        res.status(200).json({result,token});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
        
}
const loginUser = async (req,res) => {
    const {username,password} = req.body;
    try{
        const loggedUser = await userModel.findOne({username:username});
        if(!loggedUser) return res.status(400).json({message:"User doesn't exists"});

        const matchPassword =  await bcrypt.compare(password,loggedUser.password);
        
        if(!matchPassword) return res.status(400).json({message:"Invalid credentials"});
        const token = jwt.sign({username:loggedUser.username,id:loggedUser._id},SECRET_KEY);
        res.status(200).json({token});

    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
}
async function forgetPassword(req, res) {
    const { username,newPassword } = req.body;
    const newuser = await user.findOne({ username });
    if (newuser) {
      newuser.password = await bcrypt.hash(newPassword, 10);
      await newuser.save();
      res.status(200).json({ message: "Password Updated Successfully" });
    } else {
      res.status(400).json({ message: "Invalid Username or Email" });
    }
}
module.exports = {signupUser,loginUser,forgetPassword};