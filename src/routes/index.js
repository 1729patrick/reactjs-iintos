import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Dashboard from '~/pages/admin/Dashboard';
import Calendar from '~/pages/admin/Calendar';
import Users from '~/pages/admin/Users';
import Projects from '~/pages/admin/Projects';
import School from '~/pages/admin/School';
import Outputs from '~/pages/admin/Outputs';
import Log from '~/pages/admin/Log';
import Downloads from '~/pages/admin/Downloads';
import Events from '~/pages/admin/Events';

import OutputResult from '~/pages/public/OutputResult';
import Home from '~/pages/public/Home';
import Login from '~/pages/public/Login';
import SignUp from '~/pages/public/SignUp';
import Privacy from '~/pages/public/Privacy';

import IProject from '~/pages/public/Project';
import IProjects from '~/pages/public/Projects';
import IOffices from '~/pages/public/Offices';
import KnowLedge from '~/pages/public/KnowledgeBase';
import Contacs from '~/pages/public/Contacs';

import SchoolInformation from '~/pages/public/SignUp/SchoolInformation';
import AwaitVerification from '~/pages/public/AwaitVerification';

import ProjectDetails from '~/pages/admin/ProjectDetails';
import Profile from '~/pages/admin/Profile';

import Route from './Route';
import Documentation from '~/pages/public/Documentation';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/doc" component={Documentation} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} exact />

        <Route path="/iproject" component={IProject} />
        <Route path="/iprojects" component={IProjects} />
        <Route path="/ioffices" component={IOffices} />

        <Route path="/knowledge" component={KnowLedge} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/contacts" component={Contacs} />
        <Route
          path="/signup/school_information"
          component={SchoolInformation}
        />
        {/* <Route path="/news" component={Newsletter} /> */}

        <Route path="/await_verification" component={AwaitVerification} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/calendar" component={Calendar} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/events" component={Events} isPrivate />
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
        <Route path="/results" component={OutputResult} isPrivate />
        <Route path="/users" component={Users} isPrivate />
        <Route path="/outputs" component={Outputs} isPrivate />
        <Route path="/school" component={School} isPrivate />
        <Route path="/users/schools" component={Users} isPrivate />
        <Route path="/log" component={Log} isPrivate />
        <Route path="/downloads" component={Downloads} isPrivate />

        <Route component={() => <Redirect to="/dashboard" />} isPrivate />
      </Switch>
    </Router>
  );
};
