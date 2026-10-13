const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
exports.registerUser = async(req, res) => {
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password) {
            return res.status(400).json({message: "Required data doesnt exist"});
        }
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({userName, email, password:hashedPassword})
        await newUser.save();
        return res.status(200).json({message:"Successfully saved", user:{_id:newUser._id, userName:newUser.userName, email:newUser.email}})
    } catch(err) {
        return res.status(500).json({message: "Internal server error"})
    }
}

exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const checkUser = await User.findOne({email})
        if (!checkUser) {
            return res.status(400).json({message:"User is not registered"})
        }
        const isValidPassword = await bcrypt.compare(password, checkUser.password)
        if(!isValidPassword) {
            return res.status(400).json({message: "Password is Invalid"})
        }
        const token = jwt.sign({userid:checkUser._id}, process.env.jwt_secretcode, {expiresIn:"1 h"})
        return res.status(200).json({message:"Login succesfull", user:{_id:checkUser._id, userName:checkUser.userName, email:checkUser.email},token})
    } catch(err) {
        return res.status(500).json({message:"Internal server error"})
    }
}