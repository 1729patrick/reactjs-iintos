import * as Yup from 'yup';

export default Yup.object({
  id: Yup.string(),
  title: Yup.string().required('Event title is required'),
  start: Yup.date().required('Event start is required'),
  end: Yup.date().required('Event start is required'),
  description: Yup.string().required('Event description requires'),
  location: Yup.string(),
});
