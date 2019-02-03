import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .trim(),
  name: yup
    .string()
    .min(5)
    .trim(),
  password: yup
    .string()
    .min(5)
    .trim(),
  passwordConfirm: yup
    .string()
    .min(5)
    .trim(),
});

export const isFormValid = form => {
  let valueObj = {};
  for (let inputKey in form) {
    valueObj[inputKey] = form[inputKey].value;
  }
  validationSchema
    .validateSync(valueObj)
    .then(() => {
      this.setState({ formIsValid: true });
    })
    .catch(err => {
      this.setState({ formIsValid: false });
    });
};
