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
  const imgUrl = req.file.path;
  const description = req.body.description;
  let creator;
  res.json({
    message: 'Post created!',
    title: title,
    imgUrl: imgUrl,
    description: description,
  });
  const post = new Post({
    title,
    description,
    imgUrl,
    creator: req.userId,
  });
  post
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
};
