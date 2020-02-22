import * as Yup from 'yup';

export default Yup.object({
  id: Yup.string(),
  title: Yup.string().required('Result title is required'),
  description: Yup.string().required('Result description requires'),
});
