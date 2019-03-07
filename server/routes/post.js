const express = require('express');

const isAuth = require('../middleware/is-auth');

const postController = require('../controllers/post');

const router = express.Router();

router.get('/posts', postController.getPosts);
router.post('/post', isAuth, postController.createPost);

module.exports = router;
