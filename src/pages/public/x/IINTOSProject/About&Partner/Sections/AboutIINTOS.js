import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import SchoolIcon from '@material-ui/icons/School';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// core components
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import InfoArea from '~/components/InfoArea/InfoArea';

import GroupFoto from '~/assets/images/GroupFoto.jpg';

import styles from '~/assets/jss/material-kit-react/views/landingPageSections/productStyle';

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const firstList = [
    '    The global education objectives in schools;',
    '    Education for global citizen in formal education;',
    '    Global education in the European curricula;',
    '    Tool for analyzing and comparing the curricula for STEM education;',
    '    Increase students STEM competences;',
    '    Including the Common Framework of Europe Competence in the school policy plan;',
    '    Best practices of global education to implement in schools;',
    '    Virtual and real-life contexts exchanges and meetings;',
    '    Global competencies and life skills;',
    '    Build long-lasting international relationships;',
    '    Intercultural competencies development of the teachers;',
    '    Develop cross-cultural leadership and professional skills by collaborating with students from various cultures;',
    '    Make the students able to graduate with increased STEM and global competencies.',
  ];

  const secondList = [
    '    Comparison of curricula and the way to develop the European and international dimension in the curriculum;',
    '    The definition and the development of the coordinator activities in every international office in school;',
    '    The production of interactive Internet web-based platform for coordinators, teachers and all the schools stakeholders;',
    '    The organization of exchanges activities in two pilot schools.',
  ];

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What is IINTOS?</h2>
          <h5 className={classes.description}>
            The aim of this project is to develop international teaching and
            learning processes that lead our main target groups, teachers,
            students and schools stakeholders, able to make the schools more
            international and at the same time raise the competence levels in
            STEM education. For this purpose, an international office in school
            is the way to encourage, facilitate, help and promote the
            internationalization of the school at the national, European and
            international level
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem>
            <h2>
              Thus, the project developed a framework of international offices
              in schools for students and teachers, to replicate throughout
              Europe and reach the following objectives:
            </h2>
            <List component="nav" class={classes.description}>
              {firstList.map(aux => (
                <ListItemText primary={aux} />
              ))}
            </List>
          </GridItem>
          <h2>Our project has developed:</h2>
          <List component="nav" class={classes.description}>
            {secondList.map(aux => (
              <ListItemText primary={aux} />
            ))}
          </List>
          <GridItem />
          <h4 div={classes.description}>
            During the project, we focus on the STEM subjects for two main
            reasons: they are subjects fairly cultural independent and therefore
            transversal to European curricula and there is a need to increase
            pupils competences on this key subjects. IINTOS web-based open
            source platform has stored resources, existing projects and all
            relevant information related to the internationalization of the
            schools.
          </h4>
        </GridContainer>
        <h2 classes={classes.title}>In Conclusion </h2>
        <div className={classes.description}>
          The project greater aim is to facilitate the exchanges between schools
          across Europe and make more common and usual teaching and learning by
          having an international approach, it also allows the informal exchange
          of practices in the STEM subjects increasing awareness and promoting
          pupil competence development.
        </div>
      </div>
      <img
        className={classes.imgRaised}
        src={GroupFoto}
        width="1.2em"
        height=""
        alt="IPS"
      />
      <img
        src={GroupFoto}
        alt="..."
        width="550"
        height="367"
        className={`${classes.imgRaised} ${classes.imgRoundedCircle} ${classes.imgFluid}`}
      />
    </div>
  );
}
