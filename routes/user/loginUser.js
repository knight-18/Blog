const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const AppError = require("../../utils/AppError")
const { validationResult } = require("express-validator")
const CatchAsync = require("../../utils/CatchAsync")


const loginUser = CatchAsync(async (req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const message = errors.errors.map(error => error.msg)
            return res.status(400).send({ message });
        }

        const {username, password} = req.body;
        const userExists = await User.findOne({username})
        if(!userExists){
            return next(new AppError("Please provide valid credentials", 400));
        }
        const isMatch = await bcrypt.compare(password, userExists.password)

        if(!isMatch){
            return next(new AppError("Please provide valid credentials", 400));
        }
        const token = await userExists.generateAuthToken();

        res.status(200).json({status :"Successfully Logged in.", message:"Welcome to App", token, user: userExists})
}) 


module.exports = loginUser


