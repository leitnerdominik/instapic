const generateBase64FromImage = imageFile => {
  if (imageFile) {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = error => reject(error);
    });
    reader.readAsDataURL(imageFile);
    return promise;
  }
};

export default generateBase64FromImage;
