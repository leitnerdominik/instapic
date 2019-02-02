import validator from 'validator';

const isValid = (type, value) => {

  if (type === "email") {
    return validator.isEmail();
  }
}

export default isValid;