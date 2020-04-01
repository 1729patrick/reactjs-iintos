import * as Yup from 'yup';

export default Yup.object({
  userId: Yup.number().required('Teacher is required'),
  coordinator: Yup.bool(),
});
