const user = require('../model/User.js');
const bcrypt = require('bcryptjs');
const validator = require('validator');


async function signupUser(req, res) {
    const { username, email, password } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new user({ username, email, password: hashedPassword });
    try {
        await newuser.save();
        res.status(201).json(
            { "username": newuser.username,
             "email": newuser.email,
              "message": "User Created Successfully" }
            );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { username , password } = req.body; 
        const newuser = await user.findOne({ username });

        if (newuser && bcrypt.compare(password, newuser.password)) {
            res.status(200).json({  "message": "User Logged In Successfully" });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
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
exports.signupUser = signupUser;
exports.loginUser = loginUser;
exports.forgetPassword = forgetPassword;