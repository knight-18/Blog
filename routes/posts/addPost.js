const Post = require("../../models/Post/Post")
const sharp = require("sharp")
const AppError = require("../../utils/AppError")
const CatchAsync = require("../../utils/CatchAsync")
const event = require("../../utils/eventTable")

const addPost = CatchAsync( async (req, res, next) =>{
    if(typeof req.file === 'undefined' && typeof req.body.title !== 'undefined' ){
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            postBody: req.body.postBody,
            author: req.user._id
        })
    await post.save()
    return res.send({ status: 'Success', message: 'Post is created' })
    }
    else if(typeof req.file !== 'undefined' && typeof req.body.title !== 'undefined'){
        const Buffer = await sharp(req.file.buffer).png().toBuffer();
        const image = Buffer;
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            postBody: req.body.postBody,
            author: req.user._id,
            image
        })
        post.imagePath = `/api/users/posts/images/${post._id}`;
        post.shareLink = `/api/users/posts/${post._id}`
        await post.save()
        await event(`${ req.user.username} added a new Post.`, req.user)
        return res.send({ status: 'Success', message: 'Post is created' ,post});
    }
})


module.exports = addPost