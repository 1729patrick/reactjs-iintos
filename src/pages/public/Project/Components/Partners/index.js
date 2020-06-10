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

const partners = [
  {
    title: 'Polytechnic Institute of Setúbal (Portugal)',
    description: `Created in 1979, IPS is a public institution of higher education
  seeking, permanently and in association with its social partners, to
  contribute to the development of society, in general, and of the Setúbal
  region, in particular, through tertiary training activities, research
  and services provision, contributing to the creation, development,
  dissemination and transfer of knowledge, as well as the promotion of
  science and culture.`,
    link: 'https://www.ips.pt/ips_si/web_base.gera_pagina?P_pagina=29906',
    logo: ipsImage,
    image: require('~/assets/images/ips_image.png'),
  },
  {
    title: 'Palacký University Olomouc (Czech Republic)',
    description: `Palacký University Olomouc is a university with long-standing tradition.
  Founded in 1573, it is the oldest university in Moravia and the
  second-oldest university in the Czech Republic. Palacký University
  Olomouc categorises itself as a scientific university. The eight
  faculties (Theology, Medicine and Dentistry, Arts, Science, Education,
  Physical Culture, Law, Health Sciences) of Palacký University offer 332
  Bachelor’s, Master’s, and Doctoral. Palacký
  University Olomouc is one of the top Czech universities, and ranks among
  the best universities in the world, according to international rankings`,
    link: 'https://www.pdf.upol.cz',
    logo: olomoucImage,
    image: require('~/assets/images/ips_image.png'),
  },
  {
    title: 'Group of Schools José Saramago (Portugal)',
    description: `Group of Schools José Saramago
  with about 736 students is inserted in the territory belonging to the
  Municipality of Palmela, Setúbal District (about 40 KM, south of
  Lisbon). It is integrated in an Educational Territory of Priority
  Intervention (ETPI) project since 2009.`,
    link: 'http://aejs.pt/site/',
    logo: saramagoImage,
    image: require('~/assets/images/ips_image.png'),
  },
  {
    title: 'Istituto “Giancarlo Vallauri” Fossano (Italy)',
    description: `The IIS “Vallauri” is a secondary school with more than 2,200 students
  and 150 teachers and was founded in 1962. It is the biggest secondary
  school for science and technology in the Cuneo Province and offers a
  wide range of courses: ICT, Applied Sciences, Energy, Mechatronics and
  Economics.`,
    link: 'http://www.vallauri.edu',
    logo: vallauriImage,
    image: require('~/assets/images/vallauri_image.png'),
  },
];
function Partners() {
  const classes = useStyles();

  const openLink = link => {
    window.open(link, '_blank');
  };

  return (
    <Container>
      <h1>
        The partners of this project are 2 Higher Education institutions and 2
        Secondary Schools, from 3 European countries:
      </h1>
      <div className={classes.root}>
        {partners.map((partner, index) => (
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <img
                src={partner.logo}
                style={{
                  ...(index === 0
                    ? { width: 100 }
                    : index === 1
                    ? { height: 75, width: 150 }
                    : index === 2
                    ? { height: 75, width: 140 }
                    : { width: 70 }),
                  margin: 0,
                  marginRight: 15,
                }}
              />
              <Typography className={classes.heading}>
                {partner.title}
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Detail>
                <img src={partner.image} style={{ width: 250 }} />
                <span>
                  <Typography>{partner.description}</Typography>

                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openLink(partner.link)}
                  >
                    Learn More
                  </Button>
                </span>
              </Detail>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </Container>
  );
}

export default Partners;
