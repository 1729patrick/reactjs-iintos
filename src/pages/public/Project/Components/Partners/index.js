import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, TextareaAutosize } from '@material-ui/core';
import ipsImage from '~/assets/images/IPS.jpg';
import olomoucImage from '~/assets/images/UP_logo_horizont_en.png';
import saramagoImage from '~/assets/images/Saramago.jpg';
import vallauriImage from '~/assets/images/vallauriLogo.jpg';

import { Container, Detail } from './styles';

const useStyles = makeStyles(theme => ({
  root: { width: '100%' },
  heading: {
    color: '#000',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const partners_ = [
  {
    title: 'Polytechnic Institute of Setúbal (Portugal)',
    description: `Created in 1979, IPS is a public institution of higher education seeking, permanently and in association with its social partners, to contribute to the development of society, in general, and of the Setúbal region, in particular, through tertiary training activities, research and services provision, contributing to the creation, development, dissemination and transfer of knowledge, as well as the promotion of science and culture.`,
    all: `Created in 1979, IPS is a public institution of higher education seeking, permanently and in association with its social partners, to contribute to the development of society, in general, and of the Setúbal region, in particular, through tertiary training activities, research and services provision, contributing to the creation, development, dissemination and transfer of knowledge, as well as the promotion of science and culture.
    \nWith more than 6000 students and employing more than 900 teaching and non-teaching staff, IPS assumes as primordial the training of professionals with high technical and scientific expertise, offering 32 bachelor degrees and 21 master degrees, besides post-secondary training (CTeSP) and post-graduation diplomas.
    \nIPS comprises 5 Schools in the areas of Education, Technology, Business & Administration and Health, that are distributes in two campi (in Setúbal and Barreiro). The institution has well-equipped laboratories, documentation centres, audio-visual equipment and computer facilities, which are available to its students and academic and non-academic staff.
    \nIPS integrates research and development, as well as knowledge and technology transfer as an indispensable part of its action, not only as a support to its training activities, but also as a way of interaction and commitment with its community, providing consulting, research and auditing services. In this scope, IPS has created an innovation, R&D and entrepreneurship support office (UAIIDE) that fully assists researchers, entrepreneurs, students and the regional community in their activities and projects.
    \nAlso, the institution has the strategic goal to be an open and international community, being strongly committed with establishment of international partnerships and alliances. At this level, the institution has an international office (CIMOB-IPS) which provides support to mobility and international cooperation. There are several bilateral agreements established not only with European higher education institutions, but also with South American and Asian organizations, that have been allowing a fruitful exchange of students and staff. In what refers to project cooperation, IPS is presently involved in several European projects, namely under Erasmus+ and Horizon 2020 programs.
`,
    link: 'https://www.ips.pt/ips_si/web_base.gera_pagina?P_pagina=29906',
    logo: ipsImage,
    image: require('~/assets/images/ips_image.png'),
  },
  {
    title: 'Palacký University Olomouc (Czech Republic)',
    description: `Palacký University Olomouc is a university with long-standing tradition. Founded in 1573, it is the oldest university in Moravia and the second-oldest university in the Czech Republic. Palacký University Olomouc categorises itself as a scientific university. The eight faculties (Theology, Medicine and Dentistry, Arts, Science, Education, Physical Culture, Law, Health Sciences) of Palacký University offer 332 Bachelor’s, Master’s, and Doctoral. Palacký University Olomouc is one of the top Czech universities, and ranks among the best universities in the world, according to international rankings`,
    all: `Palacký University Olomouc is a university with long-standing tradition. Founded in 1573, it is the oldest university in Moravia and the second-oldest university in the Czech Republic. Palacký University Olomouc categorises itself as a scientific university. The eight faculties (Theology, Medicine and Dentistry, Arts, Science, Education, Physical Culture, Law, Health Sciences) of Palacký University offer 332 Bachelor’s, Master’s, and Doctoral. 
    \nPalacký University Olomouc is one of the top Czech universities, and ranks among the best universities in the world, according to international rankings (). Palacký University has more research centres - Institute of Molecular and Translational Medicine, The Regional Centre for Advanced Technologies and Materials, Centre for the Haná Region for Biotechnical and Agricultural Research, Research Centre for German Moravian Literature, Centre for Patristic, Medieval and Renaissance Texts, Centre for Clinical Law Education. 
    \nThe Faculty of Education strives for maintaining the tradition, versatility and modernity in the education of students for their teaching careers or other positions in education. This is done in cooperation with the other faculties of Palacký University but the priority is the development of education in the region of Olomouc and in providing qualification of graduates for positions outside the national borders.
    \nThe Faculty of Education of the Palacký University in Olomouc provides university education for future teachers and other educationists destined for various types of kindergartens, primary and secondary schools, and school and after-school education facilities. It also focuses on training staff in the field of state administration and self-government. The faculty offers an established range of accredited Bachelor, Master’s and Doctoral programmes in teaching as well as related non-teaching fields, as full-time or part-time studying programmes.
    \nThe Institute of Education and Social Studies was established on 2009. The Institute has three sections: education, teaching licensure, and social studies. The Institute offers courses in theory of education and educational disciplines to prospective teachers at primary and secondary schools. The main research areas are Future Teachers training, 21st Century Skills in Education, Ethics in Education. the Institute is in charge of the doctoral programme of Education, supervises the habilitation and professorships procedures. The Institute and its faculty have been among the university’s most successful applicants for research grants aimed primarily at the innovation of study programmes, introducing new majors or new forms of study. The titles of the projects can serve as examples: The preparation for the acquisition of teaching licensure; Evaluation pedagogic research and its methods; The operational ﬁeld of social work – the background and the aim of the study; Research of new methods in creative competitions for youth aiming at motivating for research in natural sciences. The Institute has also an extensive collaboration with other institutions both Czech and from abroad (Slovakia, Spain, the Netherlands, Portugal, Hungary, Belgium, China, Indonesia, Austria, Germany, England, Poland etc.). Further, it is a member of various organizations, societies, and associations (e.g. Czech Pedagogical Society, Czech association of pedagogical research).
`,
    link: 'https://www.pdf.upol.cz/en/',
    logo: olomoucImage,
    image: require('~/assets/images/olomuc.jpg'),
  },
  {
    title: 'Group of Schools José Saramago (Portugal)',
    description: `Group of Schools José Saramago with about 736 students is inserted in the territory belonging to the Municipality of Palmela, Setúbal District (about 40 KM, south of Lisbon). It is integrated in an Educational Territory of Priority Intervention (ETPI) project since 2009.`,
    all: `The Group of Schools José Saramago with about 736 students is inserted in the territory belonging to the Municipality of Palmela, Setúbal District (about 40 KM, south of Lisbon). It is integrated in an Educational Territory of Priority Intervention (ETPI) project since 2009.
    \nThis is a national project that includes school in a problematic socio cultural context and a contract between the school and the Ministry of Education is drawn. The school presents a project with a set of educational goals, and respective pedagogical measures, especially to reduce de school failure; the early dropout and indiscipline. The project and the respective budget are negotiated with the Ministry of Education.
    \nUnder this ETPI project the school has identified four areas of intervention in which teachers work.
    \nImproving student learning through the development of measures to support and diverse student learning difficulties in particular developing some team teaching lessons Prevention of early withdrawal and prevention of indiscipline creating the office of student support, study rooms and a system of tutors
    \nImproved internal organization in order to create conditions supportive and feasible of the measures adopted Improved relationships with families by facilitating the dissemination and contact with families about the work and projects that their children perform in school
    \nDevelopment of training initiatives in order to empower teachers to ongoing measures. Some of the measures ongoing are:
    \nStudents Support Team – SST which Aim to reduce and prevent the indiscipline, abandon and the absenteeism. Tutoring - students identified by the class council. Attribution mentoring, preferably according to the profile and needs of the student - tutors bag.
    \nAlternative Curricular Paths (PCA) which aims at responding to the needs of a group of students who can’t acquire the basic skills within the regular education system.
    \nA Museum for the Future, a project that allies art education and activities of scientific nature. Its target group is students with learning difficulties associated with significant emotional disorders.`,
    link: 'http://aejs.pt/site/',
    logo: saramagoImage,
    image: require('~/assets/images/aejs.jpeg'),
  },
  {
    title: 'Istituto “Giancarlo Vallauri” Fossano (Italy)',
    description: `The IIS “Vallauri” is a secondary school with more than 2,200 students and 150 teachers and was founded in 1962. It is the biggest secondary school for science and technology in the Cuneo Province and offers a wide range of courses: ICT, Applied Sciences, Energy, Mechatronics and Economics.`,
    all: `The IIS “Vallauri” is a secondary school with more than 2,200 students and 150 teachers and was founded in 1962. It is the biggest secondary school for science and technology in the Cuneo Province and offers a wide range of courses: ICT, Applied Sciences, Energy, Mechatronics and Economics.
    \nThe IIS “Vallauri” is also an ITS (Istituto Tecnico Superiore – Technical High School) centre for students with a secondary education diploma. Its courses provide Level 5 EQF qualifications and are financed by the Piedmont Region.
    \nThe IIS “Vallauri” has been making agreements with almost 400 different local firms to develop innovative work placement projects related to ICT, Mechanics and Energy; in addition, some students have shown great dynamism and good entrepreneurial skills both during their course of studies and in their following careers. For example, the Young Platform start-up was founded by six former students in the ICT course at Vallauri (https://youngplatform.com/) and the founders of Satispay, the revolutionary smart payment system, are from the IIS “Vallauri” too (https://www.satispay.com/).
    \nThe IIS “Vallauri” is the main training centre of a network of schools in the didactic and educational field, carrying out many projects focused on different methodologies in teaching scientific subjects and endorsing significant learning experiences. Moreover, our school aims at being a learning hub sending local students to other Europen Countries so as to form European citizens that will fertilise our and other’s soils.{' '}
    \nThe IIS “Vallauri” is a Cambridge English Language Assessment Exam Preparation Centre, ECDL and CISCO Examination Centre.
    \nThe IIS “Vallauri” has reached prestigious placements and successes in national and international competitions. The areas involved range from the pure theoretical ones (as in Physics and Astronomy Olympic Games) to the technological and design ones (Computer Science, Mechanics, Problem Solving, Zero Robotics and ZR-SAT). The numerous partnerships with various universities, study centers, entrepreneurial realities, amplify the interest and enthusiasm of young students making educational experiments and first-rate successe possible.
    \nFurthermore, The IIS “Vallauri” has long collaborated with the Politechnic of Turin providing an orientation course addressed to fifth-year students who want to start engineering studies, in order to strengthen Mathematics and Physics knowledge and skills.`,
    link: 'http://www.vallauri.edu',
    logo: vallauriImage,
    image: require('~/assets/images/vallauri_image.png'),
  },
];
function Partners() {
  const [partners, setPartners] = useState(partners_);
  const classes = useStyles();

  const openLink = link => {
    window.open(link, '_blank');
  };

  const setLearMore = ({ title }) => {
    setPartners(
      partners.map(partner =>
        partner.title === title
          ? { ...partner, showAll: !partner.showAll }
          : partner
      )
    );
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
                onClick={() => openLink(partner.link)}
                style={{
                  ...(index === 0
                    ? { width: 80 }
                    : index === 1
                    ? { height: 75, width: 150 }
                    : index === 2
                    ? { height: 75, width: 140 }
                    : { width: 70 }),
                  margin: 0,
                  marginRight: 15,
                  cursor: 'pointer',
                }}
              />
              <h4>{partner.title}</h4>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Detail>
                {partner.image && (
                  <img
                    src={partner.image}
                    style={{ width: 250, maxHeight: 220, cursor: 'pointer' }}
                    onClick={() => openLink(partner.link)}
                  />
                )}
                <span style={{ flex: 1 }}>
                  {partner.showAll ? (
                    <>
                      <TextareaAutosize disabled defaultValue={partner.all} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => setLearMore(partner)}
                      >
                        Show Less
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography>{partner.description}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => setLearMore(partner)}
                      >
                        Show More
                      </Button>
                    </>
                  )}
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
