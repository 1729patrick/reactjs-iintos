import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import SchoolIcon from '@material-ui/icons/School';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
// core components
import { NavLink } from 'react-router-dom';
import Card from '~/components/Card/Card';
import CardHeader from '~/components/Card/CardHeader';
import CardBody from '~/components/Card/CardBody';
import CardFooter from '~/components/Card/CardFooter';

// import styles from '~/assets/jss/material-kit-react/views/landingPageSections/productStyle';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
    marginTop: -10,
    fontWeight: 1000,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProductSection({ title, shortDescription, type }) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader className={classes.title}>
          {type} - {title}
        </CardHeader>
        <CardBody>{shortDescription}</CardBody>
        <CardFooter>
          <NavLink to="/iproject">Ler mais</NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}
