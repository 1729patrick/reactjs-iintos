import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Descritpion is required'),
});
