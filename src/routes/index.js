import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';
import Users from '~/pages/admin/Users';
import Projects from '~/pages/admin/Projects';
import School from '~/pages/admin/School';
import Outputs from '~/pages/admin/Outputs';

import Home from '~/pages/public/Home';
import Login from '~/pages/public/Login';
import SignUp from '~/pages/public/SignUp';
import SchoolInformation from '~/pages/public/SignUp/SchoolInformation';
import AwaitVerification from '~/pages/public/AwaitVerification';
import About from '~/pages/public/About';
import Privacy from '~/pages/public/Privacy';

import Partners from '~/pages/public/Partners';
import ProjectDetails from '~/pages/admin/ProjectDetails';
import OutputResult from '~/pages/public/OutputResult';
import Profile from '~/pages/admin/Profile';
import News from '~/pages/public/Newsletter';
import STEM from '~/pages/public/Stem';

import Route from './Route';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/news" component={News} />
        <Route path="/stem" component={STEM} />

        <Route
          path="/signup/school_information"
          component={SchoolInformation}
        />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />

        <Route path="/await_verification" component={AwaitVerification} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />

        <Route
          path="/outputs/details/:id"
          component={ProjectDetails}
          isPrivate
        />

        <Route path="/projects" component={Projects} isPrivate exact />
        <Route
          path="/projects/details/:id"
          component={ProjectDetails}
          isPrivate
        />
        <Route path="/projects/search" component={Projects} isPrivate exact />

        <Route path="/users" component={Users} isPrivate />
        <Route path="/outputs" component={Outputs} isPrivate />
        <Route path="/school" component={School} isPrivate />
        <Route path="/users/schools" component={Users} isPrivate />
        <Route path="/partners" component={Partners} />
        <Route path="/results" component={OutputResult} />

        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
