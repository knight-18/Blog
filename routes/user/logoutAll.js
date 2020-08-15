const CatchAsync = require("../../utils/CatchAsync");

const logoutAll = CatchAsync(async(req, res, next)=>{
        req.user.tokens = [];
        await req.user.save();
        res.send({ status: 'Success', message: 'Logged out all sessions' });
})

module.exports = logoutAll