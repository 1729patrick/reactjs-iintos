import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Descritpion is required'),
  link: Yup.string().url('Must be a link'),
  youtube: Yup.string().url('Must be a youtube link'),
});
