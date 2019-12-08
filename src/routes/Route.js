import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from '~/components/_layout/Auth';
import DefaultLayout from '~/components/_layout/Default';

const Route = ({ isPrivate, component: Component }) => {
  const token = localStorage.getItem('token');

  if (isPrivate) {
    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <AuthLayout>
        <Component />
      </AuthLayout>
    );
  }

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  );
};

export default Route;
