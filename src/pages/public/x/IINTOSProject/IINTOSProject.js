import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Button from '~/components/CustomButtons/Button';
import HeaderLinks from '~/components/Header/HeaderLinks';
import Parallax from '~/components/Parallax/Parallax';

import styles from '~/assets/jss/material-kit-react/views/iintosProject';

// Sections for this page
import AboutIINTOS from './Sections/AboutIINTOS';
import PartnersSection from './Sections/PartnersSection/PartnersSection';
import WorkSection from './Sections/WorkSection';

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        fixed
        changeColorOnScroll={{
          height: 50,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax small filter image={require('assets/img/profile-bg.jpg')} />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <AboutIINTOS />
          <PartnersSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
