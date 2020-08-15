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
router.post("/api/users/posts", authMiddleware, Upload.single('postImage'), multerPostError, addPost)

router.get("/api/users/posts/author/:id", authMiddleware, getAllPosts);
router.get("/api/users/posts/:id", authMiddleware, getPost)
router.get('/api/users/posts/images/:id', authMiddleware, getImage);
router.post('/api/users/posts/:id/comment', authMiddleware, addComment);

router.get("/api/users/posts/:id/comment", authMiddleware, getComments)
router.put(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  editComment
);

router.put("/api/users/posts/:id", authMiddleware, editPost)

router.delete(
  '/api/users/posts/:id/comment/:comment_id',
  authMiddleware,
  deleteComment
);


router.delete("/api/users/posts/:id", authMiddleware, deletePost)
module.exports = router