import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email()
    .required('E-mail is required'),
  oldPassword: Yup.string().required('Password is required'),
  password: Yup.string(),
});
