import * as Yup from 'yup';

export default Yup.object({
  id: Yup.string(),
  title: Yup.string().required('Activity title is required'),
  description: Yup.string().required('Activity description requires'),
});
