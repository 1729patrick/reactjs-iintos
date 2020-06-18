import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ipsImage from '~/assets/images/IPS.jpg';
import olomoucImage from '~/assets/images/UP_logo_horizont_en.png';
import saramagoImage from '~/assets/images/Saramago.jpg';
import vallauriImage from '~/assets/images/vallauriLogo.jpg';

import { Container, Detail } from './styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    color: '#000',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Management() {
  const classes = useStyles();

  return (
    <Container>
      <h1>Management</h1>
      <p>
        It refers to all the actions surrounding an international office in
        schools, from resources, tasks, budget, financing and activities. here
        you will find suggestions and definitions for each of these actions.
        Refers also to daily management and throughout each project, as well as
        all ongoing projects.
      </p>
      <span className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Resources</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <p>Human resources: (allocated team); </p>
              <p>
                <b>Permanent team:</b> Teachers (Someone with initiative,
                enthusiasm about internacionalization and wants to learn; Be
                willing to enrich themselves through sharing experiences with
                people from different backgrounds.
              </p>

              <p>
                <b>A small multidisciplinary team (4/5 people).</b> Not just
                teachers, but from other fields of expertise.
              </p>

              <p>
                <b>Extended team:</b> a consultant that can help with
                legislation, members of the community, companies, parents
                association, youth associations, etc.{' '}
              </p>

              <p>
                <b>Physical resources:</b> physical space with support
                materials, such as tables, chairs, computers and other material
                that facilitate the work of the human resources allocated to the
                office.
              </p>

              <p>
                <b>Financial resources:</b> initial own-school financing, then
                financing from other projects.{' '}
              </p>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Tasks</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <p>
                The tasks to be carried out in an international office are
                divided into two groups.
              </p>

              <p>
                <b>a) Academic tasks:</b> related to project development and
                specific projects. Curriculum analysis, selection of themes for
                projects, selection of students for projects,
              </p>

              <p>
                <b>b) Administrative and financial tasks:</b>{' '}
                support-timesheats, buying trips, reports, project management
                tasks normaly for coordinator in liaison with the principal and
                for other school services;{' '}
              </p>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Budget</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <p>
                <b>Budget of the office.</b>
              </p>
              <p>Human resources;</p>
              <p>
                Materials, disclosure, operating expenses (telephone, internet,
                electricity, working capital..etc)
              </p>
              <p>Budgets for each project.</p>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Funding</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <p>
                <b>Main and complementary funding sources</b>
              </p>

              <p>
                Monetization of local financing (municipalities, companies,
                various projects, sponsorships, campaigns in the financing
                community and logistical support and others).
              </p>
              <p> Fundraising for travel, accommodation. </p>
              <p>
                Financing of small activities integrated into projects that are
                not directly financed by formal programs.
              </p>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>Activities</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <p>
                <b>
                  Refers to the activity plan to be developed annually or for a
                  longer period by the office.
                </b>
              </p>

              <p>Teacher mobility;</p>
              <p>Student mobility;</p>
              <p>Staff mobility;</p>
              <p>Networks; </p>
              <p>International events; </p>
              <p>Virtual mobility;</p>
              <p>Training courses.</p>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </span>
    </Container>
  );
}

export default Management;
