import * as Yup from 'yup';

export default Yup.object({
  goal: Yup.string().required('Goal of project is required'),
  title: Yup.string().required('Tile of project is required'),
  description: Yup.string().required('Description of the project is required'),
  endDate: Yup.date(),
  startDate: Yup.date(),
  ageRangeStart: Yup.number().required('Start age of the project is required'),
  ageRangeEnd: Yup.number()
    .when('ageRangeStart', (ageRangeStart, schema) => {
      return schema.min(ageRangeStart);
    })
    .required('End age of the project is required'),
  type: Yup.string().required('Type of the project requires'),
  links: Yup.string(),
});
