const User = require('../models/user');
const Post = require('../models/post');
const { validationResult } = require('express-validator/check');
const { deleteImg } = require('../util/deleteFile');

exports.getProfile = (req, res, next) => {
  let currentUser;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 422;
        throw error;
      }

      currentUser = {
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        status: user.status,
      };

      return Post.find({
        _id: { $in: user.posts },
      });
    })
    .then(posts => {
      const profilePosts = posts.map(post => {
        return {
          _id: post._id,
          title: post.title,
        };
      });
      res.status(200).json({
        message: 'Profile fetched!',
        user: currentUser,
        posts: profilePosts,
      });
    });
};

exports.setStatus = (req, res, next) => {
  const status = req.body.status;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid Input!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 422;
        throw error;
      }

      user.status = status;
      return user.save();
    })
    .then(response => {
      res.status(200).json({ message: 'Status set!' });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
};

exports.setProfile = (req, res, next) => {
  // if (!req.file) {
  //   const error = new Error('Image not found');
  //   error.statusCode = 422;
  //   throw error;
  // }

  const status = req.body.status;
  
  let photoUrl = null;
  if (req.files.profileUrl) {
    photoUrl = req.files.profileUrl[0].path;
  }
  

  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 422;
        throw error;
      }

      if (!photoUrl) {
        photoUrl = user.photoUrl;
      }

      if (photoUrl !== user.photoUrl) {
        deleteImg(user.photoUrl);
      }

      user.status = status;
      user.photoUrl = photoUrl;
      return user.save();
    })
    .then(user => {
      res.status(200).json({ message: 'User edited!', user: user });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
};
