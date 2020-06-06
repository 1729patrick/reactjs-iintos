import * as Yup from 'yup';

export default Yup.object({
  id: Yup.string(),
  title: Yup.string().required('Event title is required'),
  description: Yup.string().required('Event description is required'),
  date: Yup.date().required('Event date is required'),
  type: Yup.date().required('Event type is required'),
  sections: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      title: Yup.string().required('Section title is required'),
      description: Yup.string().required('Section description is required'),
      date: Yup.date().required('Section date is required'),
    })
  ),
});
