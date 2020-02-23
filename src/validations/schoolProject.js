import * as Yup from 'yup';

export default Yup.object({
  schoolId: Yup.string().required('School is required'),
});
