const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
