const mongoose = require("mongoose")
const Comment = require("./Comment")
const PostSchema = mongoose.Schema({
    title:{
      type: String
    },
    description: {
      type: String,
      trim: true
    },
    postBody:{
      type: String
    },
    image:{
        type: Buffer
    },
    imagePath:{
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]},
    {
        timestamps: true
    }
)

PostSchema.index({ createdAt: -1 });


PostSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'author',
      select: 'username'
    })
      .populate({
        path: 'comments',
        select: '_id user content createdAt ',
        options: {
          sort: {
            createdAt: -1
          }
        }
      });
  
    next();
  });
  
  PostSchema.methods.toJSON = function() {
    const post = this;
  
    const postObject = post.toObject();
    delete postObject.image;
    delete postObject.__v;
  
    return postObject;
  };



const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
