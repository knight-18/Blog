const express = require("express")
const authMiddleware = require("../../middleware/auth")
const multerPostError = require("../../utils/MulterPostError")
const Upload = require("../../utils/multerUpload")
const addPost = require("./addPost")
const { getAllPosts, getPost} = require("./getPost")
const {addComment, editComment, deleteComment, getComments} = require("./comment")
const deletePost = require("./deletePost")
const getImage = require("./getImage")
const editPost = require("./editPost")

const router = express.Router();

//Route to create post
router.post("/api/users/posts", authMiddleware, Upload.single('postImage'), multerPostError, addPost)

//Route to get a particular post
router.get("/api/users/posts/:id", authMiddleware, getPost)

//Route to get all posts
router.get("/api/users/posts/author/:id", authMiddleware, getAllPosts);

//Route to get image associated with the post
router.get('/api/users/posts/images/:id', authMiddleware, getImage);

//Route to edit post
router.put("/api/users/posts/:id", authMiddleware, editPost)

//Route to delete a post
router.delete("/api/users/posts/:id", authMiddleware, deletePost)

//Route to add comment
router.post('/api/users/posts/:id/comment', authMiddleware, addComment);

//Route to get comments 
router.get("/api/users/posts/:id/comment", authMiddleware, getComments)

//Route to edit comment
router.put(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  editComment
);

//Route to delete a comment
router.delete(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  deleteComment
);

module.exports = router