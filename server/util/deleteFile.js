 const path = require('path');
 const fs = require('fs');

const deleteImg = imagePath => {
  filePath = path.join(__dirname, '..', imagePath);
  fs.unlink(filePath, err => console.log(err));
};

exports.deleteImg = deleteImg;