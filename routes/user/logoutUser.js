const User = require("../../models/user")
const express = require("express")
const CatchAsync = require("../../utils/catchAsync")
const router = express.Router()

const logoutUser = CatchAsync( async (req, res,next) => {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        });
        
        await req.user.save();
        
        res.status(200).send("Successfully Logged out.")
  })

 module.exports = logoutUser