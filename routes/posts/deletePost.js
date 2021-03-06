const AppError = require("../../utils/AppError")
const CatchAsync = require("../../utils/CatchAsync")
const Post = require("../../models/Post/Post")
const Comment = require('../../models/Post/Comment');
const event = require("../../utils/eventTable");

const deletePost = CatchAsync(async (req, res, next) => {
  const exists = await Post.findOne({
      _id: req.params.id,
      author: req.user._id
  });
  if (!exists) {
    throw new Error("Post not found")
  }
  await event(`${req.user.username} deleted his post ${exists.title}`, req.user)
  await exists.remove()
  await Comment.deleteMany({post: exists._id})
  res.send({ status: 'Success', message: 'Post is deleted' });
});
module.exports = deletePost;
