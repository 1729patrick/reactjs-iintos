import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';
import Users from '~/pages/admin/Users';
import Project from '~/pages/admin/Project';
import School from '~/pages/admin/School';

import Home from '~/pages/public/Home';
import Login from '~/pages/public/Login';
import SignUp from '~/pages/public/SignUp';
import SchoolInformation from '~/pages/public/SignUp/SchoolInformation';
import AwaitVerification from '~/pages/public/AwaitVerification';
import About from '~/pages/public/About';

import Route from './Route';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} exact />
        <Route
          path="/signup/school_information"
          component={SchoolInformation}
        />
        <Route path="/await_verification" component={AwaitVerification} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/school" component={School} isPrivate />
        <Route path="/project" component={Project} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />
        <Route path="/project" component={Project} isPrivate />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} isPrivate />
        <Route path="/users/schools" component={Users} isPrivate />

        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
