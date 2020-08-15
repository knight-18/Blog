const CatchAsync = require("../../utils/CatchAsync");
const User = require("../../models/user");

const getProfile = CatchAsync( async (req, res)=>{
    const user = await User.findById(req.user._id).select(
        '_id username email avatarUrl createdAt'
    )

    res.send({status:"Success", data:{user}})
})

module.exports = getProfile