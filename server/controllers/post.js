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
    }).then(user => {
      console.log(currentPost);
      res.status(200).json({message: 'Post fetched!', post: currentPost, creator: user.name})
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
