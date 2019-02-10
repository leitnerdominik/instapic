const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('../util/error-handler');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log('signup');
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password !== passwordConfirm) {
    throw new Error('Passwords dont match!');
  }

  bcrypt.hash(password, 12).then(hashedPw => {
    const user = new User({
      email: email,
      name: name,
      password: hashedPw
    });

    return user.save();
  }).then(user => {
    res.status(201).json({message: 'User created!', userId: user._id});
  }).catch(err => {
    errorHandler(err);
  })
}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('Could not find a User with that Email.');
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt(password, user.password);
    })
    .then(isPasswordCorrect => {
      if (!isPasswordCorrect) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        'supersecretpassword',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    }).catch(err => {
      errorHandler(err);
    });
};
