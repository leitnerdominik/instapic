module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": ["airbnb", "prettier"],
  "rules": {
    "no-console": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "prettier/prettier": "error"
  },
  "parser": "babel-eslint",
  "plugins": ["prettier"],
};