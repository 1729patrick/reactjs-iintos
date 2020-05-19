import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import SchoolIcon from '@material-ui/icons/School';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
// core components
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import InfoArea from '~/components/InfoArea/InfoArea';

import styles from '~/assets/jss/material-kit-react/views/landingPageSections/productStyle';

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What is IINTOS?</h2>
          <h5 className={classes.description}>
            The aim of our project is to develop international teaching and
            learning processes that lead our main target groups, teachers,
            students and schools stakeholders, able to make the schools more
            international and at the same time raise the competence levels in
            STEM education. For this purpose, an international office in school
            is the way to encourage, facilitate, help and promote the
            internationalization of the school at the national, European and
            international level.
          </h5>
          to do more
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="IINTOS Projects"
              description="See what outputs we have done"
              icon={SchoolIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="International Projects"
              description="We are a platform that host multiple mobility projects"
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Offices"
              description="Learn how you can create your mobility office in your school"
              icon={HomeWorkIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
