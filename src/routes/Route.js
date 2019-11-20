import React from 'react';

import AuthLayout from '~/pages/admin/_layout/Auth';

const Route = ({ isPrivate, component: Component }) => {
  if (isPrivate) {
    return (
      <AuthLayout>
        <Component />
      </AuthLayout>
    );
  }
};

export default Route;
