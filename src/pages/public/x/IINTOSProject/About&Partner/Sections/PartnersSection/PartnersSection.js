import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Schedule from '@material-ui/icons/Schedule';
import List from '@material-ui/icons/List';
import LocationOn from '@material-ui/icons/LocationOn';

// core components
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import NavPills from '~/components/NavPills/NavPills';
import Card from '~/components/Card/Card';

import IPS from './Partners/IPS';
import Olomouc from './Partners/Olomouc';
import Saramago from './Partners/Saramago';
import Vallauri from './Partners/Vallauri';

import IPSimage from '~/assets/images/IPS.jpg';
import image2 from '~/assets/img/bg2.jpg';
import image3 from '~/assets/img/bg3.jpg';

import styles from '~/assets/jss/material-kit-react/views/landingPageSections/productStyle';
const useStyles = makeStyles(styles);

export default function SectionPills() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Partners</h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <NavPills
              color="primary"
              alignCenter
              tabs={[
                {
                  tabButton: 'IPS',
                  tabIcon: Dashboard,
                  tabContent: <IPS />,
                },
                {
                  tabButton: 'PUO',
                  tabIcon: Schedule,
                  tabContent: <Olomouc />,
                },
                {
                  tabButton: 'Saramago',
                  tabIcon: List,
                  tabContent: <Saramago />,
                },
                {
                  tabButton: 'Vallauri',
                  tabIcon: List,
                  tabContent: <Vallauri />,
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
