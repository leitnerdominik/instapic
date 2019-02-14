const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.login);

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('A user with that email already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8 }),
    body('name')
      .trim()
      .isLength({ min: 8 }),
  ],
  authController.signup
);

module.exports = router;
