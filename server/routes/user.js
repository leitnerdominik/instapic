const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/profile', isAuth, userController.getProfile);
router.put(
  '/status',
  [
    body('status')
      .trim()
      .exists({ checkFalsy: true }),
  ],
  isAuth,
  userController.setStatus
);

module.exports = router;
