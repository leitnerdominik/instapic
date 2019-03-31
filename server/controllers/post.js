const path = require('path');
const fs = require('fs');

const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  let currentPost;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found!');
        error.statusCode = 404;
        throw error;
      }
      currentPost = post;
      return User.findById(post.creator);

      // res.status(200).json({ message: 'Post fetched.', post: post });
    })
    .then(user => {
      console.log(currentPost);
      res.status(200).json({
        message: 'Post fetched!',
        post: currentPost,
        creator: user.name,
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid Input!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (!req.file) {
    const error = new Error('Image not found!');
    error.statusCoe = 422;
    throw error;
  }

  const title = req.body.title;
  const imgUrl = req.file.path;
  const description = req.body.description;
  let creator;

  const post = new Post({
    title,
    description,
    imgUrl,
    creator: req.userId,
  });
  post
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.editPost = (req, res, next) => {
  const postId = req.params.postId;

  const title = req.body.title;
  let imageUrl = req.body.imgUrl;
  const description = req.body.description;

  if (req.file) {
    imageUrl = req.file.path;
  }

  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not fetch post!');
        error.statusCode = 422;
        throw error;
      }

      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imgUrl) {
        deleteImg(post.imgUrl);
      }

      post.title = title;
      post.imgUrl = imageUrl;
      post.description = description;
      return post.save();
    })
    .then(post => {
      res.status(200).json({ message: 'Post edited!', post: post });
    })
    .catch(err => next(err));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found!');
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 401;
        throw error;
      }

      deleteImg(post.imgUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(post => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post deleted!' });
    })
    .catch(error => {
      next(error);
    });
};

exports.toggleLikePost = (req, res, next) => {
  let currentUser = null;
  const postId = req.params.postId;

  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 422;
        throw error;
      }

      currentUser = user;

      return Post.findById(postId);
    })
    .then(post => {
      if (!post) {
        const error = new Error('Post not found!');
        error.statusCOde = 422;
        throw error;
      }

      console.log(post.likedUser, currentUser._id);
      

      const LikedUserIndex = post.likedUser.indexOf(currentUser._id);
      console.log(LikedUserIndex)
      if (LikedUserIndex === -1) {
        post.likedUser.push(currentUser);
        post.likes += 1;
      } else {
        post.likedUser.splice(LikedUserIndex, 1);
        post.likes -= 1;
      }

      return post.save();
    })
    .then(response => {
      res.status(201).json({ message: 'Post liked successfully!' });
    })
    .catch(error => {
      next(error);
    });
};

const deleteImg = imagePath => {
  filePath = path.join(__dirname, '..', imagePath);
  fs.unlink(filePath, err => console.log(err));
};
