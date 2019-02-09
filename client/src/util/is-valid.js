import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .trim()
    .required(),
  name: yup
    .string()
    .min(5)
    .trim(),
  password: yup
    .string()
    .min(5)
    .trim()
    .required(),
  passwordConfirm: yup
    .string()
    .min(5)
    .trim(),
});


