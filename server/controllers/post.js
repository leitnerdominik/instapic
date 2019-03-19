const path = require('path');
const fs = require('fs');

const Post = require('../models/post');
const User = require('../models/user');

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
  const title = req.body.title;
  const imgUrl = req.file.path;
  const description = req.body.description;
  let creator;
  // res.json({
  //   message: 'Post created!',
  //   title: title,
  //   imgUrl: imgUrl,
  //   description: description,
  //   creator: req.userId,
  // });
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

const deleteImg = imagePath => {
  filePath = path.join(__dirname, '..', imagePath);
  fs.unlink(filePath, err => console.log(err));
};
