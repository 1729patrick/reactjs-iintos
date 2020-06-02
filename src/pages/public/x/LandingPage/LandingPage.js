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

import styles from '~/assets/jss/material-kit-react/views/landingPage';

// Sections for this page
import ProductSection from './Sections/ProductSection';
import TeamSection from './Sections/TeamSection';
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
          height: 300,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax
        filter
        image={require('~/assets/img/3840x2400_bag-smartphone-notebook.jpg')}
      >
        <div id="head" className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>IINTOS</h1>
              <h4 className={classes.subtitle}>
                Implementation of International Offices in Schools
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
