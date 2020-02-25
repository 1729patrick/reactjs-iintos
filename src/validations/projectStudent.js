import * as Yup from 'yup';

export default Yup.object({
  studentName: Yup.string().required('Student name is required'),
  schoolId: Yup.number().required('Student school is required'),
});
