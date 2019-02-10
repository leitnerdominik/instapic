const Post = require('../models/post');
const errorHandler = require('../util/error-handler');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      errorHandler(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const imagePath = req.body.imagePath;
  const description = req.body.description;
  res.json({
    message: 'Post created!',
    title: title,
    imagePath: imagePath,
    description: description,
  });
  const post = new Post({
    title,
    description,
    imagePath,
  });
  post
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
};
