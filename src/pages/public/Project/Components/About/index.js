import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PublicContainer as Container } from '~/styles/Sidebar';

export default function About() {
  return (
    <Container>
      <h1>What is IINTOS?</h1>

      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p>
          The aim of this project is to develop international teaching and
          learning processes that lead our main target groups, teachers,
          students and schools stakeholders, able to make the schools more
          international and at the same time raise the competence levels in STEM
          education. For this purpose, an international office in school is the
          way to encourage, facilitate, help and promote the
          internationalization of the school at the national, European and
          international level.
        </p>
        <img
          src={require('../../../../../assets/images/group.jpg')}
          style={{ width: '90%', marginLeft: 15, margin: '0 auto' }}
        />
      </span>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>
            Thus, the project developed a framework of international offices in
            schools for students and teachers, to replicate throughout Europe
            and reach the following objectives:
          </h4>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <ul>
            <li>The global education objectives in schools;</li>
            <li>Education for global citizen in formal education;</li>
            <li>Global education in the European curricula;</li>
            <li>Tool for analyzing and comparing the curricula;</li>
            <li>Increase students competences;</li>
            <li>
              Including the Common Framework of Europe Competence in the school
              policy plan;
            </li>
            <li>Best practices of global education to implement in schools;</li>
            <li>Virtual and real-life contexts exchanges and meetings;</li>
            <li>Global competencies and life skills;</li>
            <li>Build long-lasting international relationships;</li>
            <li>Intercultural competencies development of the teachers;</li>
            <li>
              Develop cross-cultural leadership and professional skills by
              collaborating with students from various cultures;
            </li>
            <li>
              Make the students able to graduate with increased, among others,
              STEM and global competencies.
            </li>
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>Our project has developed:</h4>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <span>
            <ul>
              <li>
                Comparison of curricula and the way to develop the European and
                international dimension in the curriculum;
              </li>
              <li>
                The definition and the development of the coordinator activities
                in every international office in school;
              </li>
              <li>
                The production of interactive Internet web-based platform for
                coordinators, teachers and all the schools stakeholders;{' '}
              </li>
              <li>
                The organization of exchanges activities in two pilot schools.
              </li>
            </ul>
            <p>
              During the project, we initially focused on the STEM subjects for
              two main reasons: they are subjects fairly cultural independent
              and therefore transversal to European curricula and there is a
              need to increase pupils competences on this key subjects. IINTOS
              web-based open source platform has stored resources, existing
              projects and all relevant information related to the
              internationalization of the schools.
            </p>
          </span>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>In Conclusion</h4>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <p>
            The project greater aim is to facilitate the exchanges between
            schools across Europe and make more common and usual teaching and
            learning by having an international approach, it also enables the
            informal exchange of practices in, for example, the STEM subjects
            increasing awareness and promoting pupil competence development
          </p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Container>
  );
}
