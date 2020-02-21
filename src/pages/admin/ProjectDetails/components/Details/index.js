import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { Form, Container } from './styles';

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
        label="Age Range"
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
