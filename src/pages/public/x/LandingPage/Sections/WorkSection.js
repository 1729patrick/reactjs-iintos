import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import { NavLink } from 'react-router-dom';
import styles from '~/assets/jss/material-kit-react/views/landingPageSections/workStyle';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import CustomInput from '~/components/CustomInput/CustomInput';
import Button from '~/components/CustomButtons/Button';

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us!</h2>
          <h4 className={classes.description}>
            You can register in our platform and your international sucess with
            us. You'll have access to a wonderfull community of schools ready to
            make partnerships.
          </h4>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
              <NavLink to="/login">
                <Button className={classes.register} color="primary">
                  <h2>Register!</h2>
                </Button>
              </NavLink>
            </GridItem>
          </GridContainer>{' '}
        </GridItem>
      </GridContainer>
    </div>
  );
}
