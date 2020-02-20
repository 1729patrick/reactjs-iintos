import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('Name of school is required'),
  phone: Yup.string().required('Phone of the school is required'),
  country: Yup.string().required('Country of the school is required'),
  city: Yup.string().required('City of the school requires'),
  postalCode: Yup.string(),
});
