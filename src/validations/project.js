import * as Yup from 'yup';

export default Yup.object({
  goal: Yup.string().required('Goal of project is required'),
  title: Yup.string().required('Tile of project is required'),
  description: Yup.string().required('Description of the project is required'),
  ageRangeStart: Yup.number(),
  ageRangeEnd: Yup.number().when('ageRangeStart', (ageRangeStart, schema) => {
    return schema.min(ageRangeStart);
  }),
  type: Yup.string().required('Type of the project requires'),
  links: Yup.string(),
});
