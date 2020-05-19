import React, { useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { Container, Content } from './styles';

import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';

import validationSchema from '~/validations/login';
import { useUserContext } from '~/context/UserContext';

const Login = ({ history }) => {
  const { setUser } = useCallback(useUserContext(), []);

  const submitForm = async credentials => {
    try {
      const response = await api.post('/sessions', credentials);
      const { user, token, school } = response.data;

      if (!user.active) {
        return history?.push('/await_verification');
      }

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('school', JSON.stringify(school));
      localStorage.setItem('token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      apiCalendar.defaults.headers.userID = user?.email;

      setUser({ user, school, token });

      history.push('/dashboard');
    } catch ({ response }) {
      console.log(response);
      toast.error(response?.data?.error || 'Invalid credentials');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <Container>
      <Content>
        <h1>Login</h1>

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email"
            type="text"
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

          <p>
            Don't have account? <Link to="signup">Create your account</Link>
          </p>

          <Button title="Login" />
        </form>
      </Content>
    </Container>
  );
};

export default withRouter(Login);
