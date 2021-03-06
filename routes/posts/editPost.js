const CatchAsync = require("../../utils/CatchAsync")
const AppError = require("../../utils/AppError")
const Post = require("../../models/Post/Post")
const event = require("../../utils/eventTable")

const editPost = CatchAsync( async(req, res, next) =>{
    const post = await Post.findOne({
        _id: req.params.id,
        author: req.user._id
    })

    if(!post)
        return next(new AppError("No such post found", 400))

    const update = await Post.findOneAndUpdate({
        _id: req.params.id,
        author: req.user._id
    },
    {
        title: req.body.title? req.body.title:post.title,
        description: req.body.description? req.body.description:post.description,
        postBody: req.body.post? req.body.postBody:post.postBody

    })
    await event(`${req.user.username} edited his post ${post.title}`, req.user)
    return res.status(200).send({status:"Success", message:"Post edited successfully"})    
})

module.exports = editPost