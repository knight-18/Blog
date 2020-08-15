const Post = require("../../models/Post/Post")
const Comment = require("../../models/Post/Comment")
const CatchAsync = require("../../utils/CatchAsync")
const AppError = require("../../utils/AppError")


const addComment = CatchAsync( async( req, res, next) =>{
    const comment = new Comment({
        content: req.body.content,
        user: req.user._id
    })

    const post = await Post.findById(req.params.id)
    post.comments.push(comment._id);
    comment.post = post._id;
    await comment.save();
    await post.save()
    res.send({
        status: "Success",
        message:"Comment is added successfully.",
        post
    })
})

const editComment = CatchAsync( async(req, res, next)=>{
    await Comment.findOneAndUpdate(
        {
            _id: req.params.comment_id,
            user: req.user._id
        },
        {
            content: req.body.content
        }
    )
    res.send({
        status: "Success",
        message:"Comment updated"
    })
})

const deleteComment = CatchAsync( async(req, res, next)=>{
    const commentExists = await Comment.findOne({
        _id: req.params.comment_id,
        user: req.user._id
    })

    if(!commentExists)
        return next(AppError("No such comment associated with the post.",400))
    await Post.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $pull:{
            comments: req.params.comment_id
        }
    })
    await commentExists.remove()
    res.send({ status: 'Success', message: 'Comment is deleted' });
})

const getComments = CatchAsync( async(req, res, next)=>{
    const post = await Post.findById(req.params.id)
    if(!post)
        return next(new AppError("No such post found.", 400))
    
    return res.status(200).send({status:"Success", comments:post.comments})
})

module.exports = {
    addComment, editComment, deleteComment, getComments
}