const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const Post = require("./Post/Post")
const Comment = require("./Post/Comment")
const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true
        },
        passwordChangedAt:{
            type: Date
        },
        passwordChangeLimitTime:{
            type: Date
        },
        avatar: {
            type: Buffer
        },
        avatarUrl:{
            type: String
        },
        tokens: [
            {
              token: {
                type: String,
                required: true
              }
            }
          ],
        passwordResetToken: String,
        resetTokenExpire:{
            type: Date
        }
    },
    {
        timestamps: true,
        toJSON:{
            virtuals: true
        }
    }
)

UserSchema.index({ username: 'text' });

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
  
    return token;
  };

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  
      next();
    } else {
      next();
    }
});

UserSchema.pre('remove', async function(next) {
  const user = this;

  await Post.deleteMany({ author: user._id });

  await Comment.deleteMany({ user: user._id });

  next();
});

UserSchema.methods.createPasswordResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = await crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.resetTokenExpire = Date.now() + 10 * 60 * 60 * 1000;
    return resetToken;
  };

UserSchema.methods.toJSON = function() {
const user = this;

const userObject = user.toObject();
delete userObject.password;
delete userObject.tokens;
delete userObject.passwordResetToken;
delete userObject.resetTokenExpire;

delete userObject.avatar;
delete userObject.__v;
return userObject;
};


const User = mongoose.model('User', UserSchema);
// Export model
module.exports = User;



    