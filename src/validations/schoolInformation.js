import * as Yup from 'yup';

const cordinator = Yup.object({
  name: Yup.string()
    .min(12, 'Must be 12 characters or more')
    .required('School name is required'),
  phone: Yup.number()
    .required('School phone is required')
    .typeError('Must specify a number'),
  country: Yup.string().required('School country is required'),
  city: Yup.string().required('School city is required'),
  cep: Yup.string().required('Postal code is required'),
  cordinatorVerification: Yup.mixed().required('File is required'),
});

const prof = Yup.object({
  schoolId: Yup.number()
    .typeError('School is required')
    .required('School is required'),
});

export { cordinator, prof };
