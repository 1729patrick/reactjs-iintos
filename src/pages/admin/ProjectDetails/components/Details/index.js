import React from 'react';

import { useFormik } from 'formik';

import Input from '~/components/Input';
import { Form } from './styles';

export default ({ initialValues }) => {
  // Form controller
  console.log(initialValues);

  const formik = useFormik({
    initialValues,
  });

  return (
    <Form>
      <Input
        label="Title"
        type="text"
        placeholder="Type the project title"
        name="title"
        readOnly
        values={formik.values}
      />
      <Input
        label="Goal"
        type="text"
        placeholder="Type the project goal"
        name="goal"
        readOnly
        values={formik.values}
      />

      <Input
        label="Description"
        type="text"
        textarea
        placeholder="Tell more about this project"
        name="description"
        readOnly
        values={formik.values}
      />
      <Input
        label="Links"
        type="text"
        placeholder="links"
        name="links"
        readOnly
        values={formik.values}
      />
      <Input
        label="Target Audience"
        type="targetAudience"
        placeholder="What's the project target audience"
        name="targetAudience"
        readOnly
        values={formik.values}
      />
      <Input
        label="Mobility Type"
        type="type"
        placeholder="What's the mobility type?"
        name="type"
        readOnly
        values={formik.values}
      />
    </Form>
  );
};
