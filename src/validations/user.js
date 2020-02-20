import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('User name is required'),
  email: Yup.string()
    .email()
    .required('User e-mail is required'),
  active: Yup.string(),
  schoolId: Yup.string().nullable(),
  roleId: Yup.string().required('User role is required'),
});
