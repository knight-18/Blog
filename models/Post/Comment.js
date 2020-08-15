const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post",
      required: true
    }
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
