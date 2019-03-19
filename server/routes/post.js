const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');

const postController = require('../controllers/post');

const router = express.Router();

router.get('/posts', postController.getPosts);
router.post('/post', isAuth, postController.createPost);
router.get('/:postId', postController.getPost);
router.put('/:postId', isAuth, postController.editPost);
router.delete('/:postId', isAuth, postController.deletePost);

module.exports = router;
