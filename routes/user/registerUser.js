const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator');
const { accountCreated } = require('../../emails/Account');
const CatchAsync = require("../../utils/catchAsync");
const event = require("../../utils/eventTable")

const registerUser =  CatchAsync( async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const message = errors.errors.map(error => error.msg)
            return res.status(400).send({status:"Failed", message})
        }

        const {username, password, email} = req.body
        const userExists = await User.findOne({username})
        if(userExists){
            return res.status(400).send("User with this username already exists.")
        }

        const newUser = new User({
            username,
            email,
            password
        })
        const token = await newUser.generateAuthToken()
        accountCreated(newUser.username, newUser.email)
        await event("New user registered", newUser)
        res.status(201).send({
            status: "Success",
            message:"Account is created successfully.",
            token,
            newUser
        })
}) 


module.exports = registerUser