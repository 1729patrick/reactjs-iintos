import * as Yup from 'yup';

export default Yup.object({
  email: Yup.date().required('Email is required'),
  body: Yup.string().required('Email body is required'),
});
