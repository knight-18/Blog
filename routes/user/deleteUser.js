const CatchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError")
const bcrypt = require("bcryptjs")
const { accountDeleted } = require("../../emails/Account")
const User = require("../../models/user")
const { validationResult } = require("express-validator")

const deleteUser = CatchAsync( async(req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const message = errors.errors.map(error => error.msg);

        return res.status(400).send({ status: 'Fail', message });
    }
    const {username, password} = req.body;
    const user = await User.findById(req.user._id)

    if(!user){
        return next(new AppError("No user found with this username", 400))
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return next(new AppError("Incorrect Password", 400))
    const removed = await user.remove()
    accountDeleted(removed.username, removed.email)
    return res.status(200).send({status:"Success",message:"Account was deleted successfully."})
})


module.exports = deleteUser