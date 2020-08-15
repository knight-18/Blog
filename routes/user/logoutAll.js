const CatchAsync = require("../../utils/catchAsync");

const logoutAll = CatchAsync(async(req, res, next)=>{
        req.user.tokens = [];
        await req.user.save();
        res.send({ status: 'Success', message: 'Logged out all sessions' });
})

module.exports = logoutAll