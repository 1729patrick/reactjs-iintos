import * as Yup from 'yup';

export default Yup.object({
  studentName: Yup.string().required('Student name is required'),
  studentAge: Yup.number().required('Student age is required'),
});
