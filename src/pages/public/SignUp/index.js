import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Checkbox from '~/components/Checkbox';

import validationSchema from '~/validations/signup';

import { Container, Content } from './styles';

const SignUp = ({ history }) => {
  const nextStep = values => {
    localStorage.setItem('registration', JSON.stringify(values));
    history.push('signup/school_information', values);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      coordinator: false,
    },
    validationSchema,

    onSubmit: nextStep,
  });

  useEffect(() => {
    const registration = localStorage.getItem('registration');

    if (registration) {
      const values = JSON.parse(registration);

      formik.setValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Content>
        <h1>Create your account</h1>

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Type your name"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Type your email"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Type your password"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />

          <Input
            label="Confirm password"
            type="password"
            name="passwordConfirm"
            placeholder="Type your confirm password"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />

          <Checkbox
            name="coordinator"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />

          <Button title="Next step" type="submit" />
        </form>
      </Content>
    </Container>
  );
};

export default withRouter(SignUp);
