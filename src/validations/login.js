import * as Yup from 'yup';

export default Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required('Password is required'),
});
