import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string()
    .min(12, 'Must be 12 characters or more')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password don't match")
    .required('Password confirm is required'),
  coordinator: Yup.boolean(),
});
