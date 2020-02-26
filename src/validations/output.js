import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string().required('Tile of output is required'),
  description: Yup.string().required('Description of the output is required'),
});
