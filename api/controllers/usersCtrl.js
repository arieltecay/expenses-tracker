const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration
const userController = {
    //register user
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        //validate
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400);
            throw new Error("User already exist");
        }
        //hash de user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user & save into db
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        //send the response
        res.json({
            _id: userCreated._id,
            username: userCreated.username,
            email: userCreated.email,
        });
    }),
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        //validate
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("Invalid email");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid Password");
        }
        //genereate token
        const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
            expiresIn: "30d",
        });
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: "Login Success",
            token,
        });
    }),
    profile: asyncHandler(async (req, res) => {
        const user = await User.findById(req.user);
        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }
        res.json({
            username: user.username,
            email: user.email,
        });
    }),
    //changePassword
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        //validate
        if (!newPassword) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const user = await User.findById(req.user);
        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }
        //validar si el pass ingresado es igual al anterior
        const isMatch = await bcrypt.compare(newPassword, user.password);
        if (isMatch) {
            res.status(400);
            throw new Error("New password can't be the same as the old password");
        }
        //hash de user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save({
            validateBeforeSave: false,
        });
        res.json({
            message: "Password changed successfully",
        });
    }),
    //update profile
    updateProfile: asyncHandler(async (req, res) => {
        const { username, email } = req.body;
        //validate
        if (!username || !email) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const user = await User.findById(req.user);
        if (!user) {
            res.status(400);
            throw new Error("User not found");
        }
        user.username = username;
        user.email = email;
        await user.save();
        res.json({
            username: user.username,
            email: user.email,
        });
    })
}

module.exports = userController;
