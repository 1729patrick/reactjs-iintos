import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';

import Route from './Route';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />
        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
