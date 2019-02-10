exports.errorHandler = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next();
}