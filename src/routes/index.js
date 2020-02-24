import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';
import Users from '~/pages/admin/Users';
import Projects from '~/pages/admin/Projects';
import School from '~/pages/admin/School';

import Login from '~/pages/public/Login';
import SignUp from '~/pages/public/SignUp';
import SchoolInformation from '~/pages/public/SignUp/SchoolInformation';
import AwaitVerification from '~/pages/public/AwaitVerification';
import About from '~/pages/public/About';

import Partners from '~/pages/public/Partners';
import ProjectDetails from '~/pages/admin/ProjectDetails';

import Route from './Route';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} exact />
        <Route
          path="/signup/school_information"
          component={SchoolInformation}
        />
        <Route path="/about" component={About} />

        <Route path="/await_verification" component={AwaitVerification} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />

        <Route path="/projects" component={Projects} isPrivate />
        <Route path="/project/:id" component={ProjectDetails} isPrivate />

        <Route path="/users" component={Users} isPrivate />
        <Route path="/school" component={School} isPrivate />
        <Route path="/users/schools" component={Users} isPrivate />
        <Route path="/partners" component={Partners} />

        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
