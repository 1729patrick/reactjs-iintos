import * as Yup from 'yup';

export default Yup.object({
  userId: Yup.number().required('Professor is required'),
});
