export const generateBase64FromImage = imageFile => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = e => resolve(e.target.result);
    reader.onerror = error => reject(error);
  });
  reader.readAsDataURL(imageFile);
  return promise;
};
