const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');

const postController = require('../controllers/post');

const router = express.Router();

router.get('/posts', postController.getPosts);
router.post(
  '/post',
  [
    body('title')
      .trim()
      .exists({ checkFalsy: true }),
    body('description')
      .trim()
      .exists({ checkFalsy: true }),
  ],
  isAuth,
  postController.createPost
);
router.get('/:postId', postController.getPost);

module.exports = router;
