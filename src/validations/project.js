import * as Yup from 'yup';

export default Yup.object({
  goal: Yup.string().required('Goal of project is required'),
  description: Yup.string().required('Description of the project is required'),
  targetAudience: Yup.string().required('Age range required'),
  type: Yup.string().required('Type of the project requires'),
  links: Yup.string(),
});
