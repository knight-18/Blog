const AppError = require("../../utils/AppError")
const CatchAsync = require("../../utils/CatchAsync")
const Post = require("../../models/Post/Post")
const User = require("../../models/user")

//Function to get all posts of a user
const getAllPosts = CatchAsync( async( req, res, next)=>{
    const postAuthor = await User.findById(req.params.id)
    if(!postAuthor){
        return next(new AppError("No such author found", 400))
    }
    const posts = await Post.find({author: req.params.id}).sort({
        createdAt: -1
    })
    res.send({
        status: "Success",
        postsCount: posts.length,
        posts
    })
})

const getPost = CatchAsync( async (req, res, next) =>{
    const post = await Post.findOne({_id: req.params.id})

    if(!post){
        return next(new AppError("Post Not Found", 400))
    }

    res.send({
        status: "Success",
        post
    })
})

module.exports = { getAllPosts, getPost}