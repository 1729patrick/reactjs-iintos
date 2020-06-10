import React from 'react';
import { Container } from './style';

export default function About() {
  return (
    <Container>
      <div>
        <h1>What is IINTOS?</h1>

        <span style={{ display: 'flex' }}>
          <img
            src={require('../../../../../assets/images/group.jpg')}
            style={{ width: 600, marginRight: 15 }}
          ></img>
          <p>
            The aim of this project is to develop international teaching and
            learning processes that lead our main target groups, teachers,
            students and schools stakeholders, able to make the schools more
            international and at the same time raise the competence levels in
            STEM education. For this purpose, an international office in school
            is the way to encourage, facilitate, help and promote the
            internationalization of the school at the national, European and
            international level
          </p>
        </span>

        <span style={{ display: 'flex' }}>
          <span>
            Thus, the project developed a framework of international offices in
            schools for students and teachers, to replicate throughout Europe
            and reach the following objectives:
            <ul>
              <li>The global education objectives in schools;</li>
              <li>Education for global citizen in formal education;</li>
              <li>Global education in the European curricula;</li>
              <li>
                Tool for analyzing and comparing the curricula for STEM
                education;
              </li>
              <li>Increase students STEM competences;</li>
              <li>
                Including the Common Framework of Europe Competence in the
                school policy plan;
              </li>
              <li>
                Best practices of global education to implement in schools;
              </li>
              <li>Virtual and real-life contexts exchanges and meetings;</li>
              <li>Global competencies and life skills;</li>
              <li>Build long-lasting international relationships;</li>
              <li>Intercultural competencies development of the teachers;</li>
              <li>
                Develop cross-cultural leadership and professional skills by
                collaborating with students from various cultures;
              </li>
              <li>
                Make the students able to graduate with increased STEM and
                global competencies.
              </li>
            </ul>
          </span>
        </span>
        <h4>Our project has developed:</h4>
        <span>
          <p>
            Comparison of curricula and the way to develop the European and
            international dimension in the curriculum; The definition and the
            development of the coordinator activities in every international
            office in school; The production of interactive Internet web-based
            platform for coordinators, teachers and all the schools
            stakeholders; The organization of exchanges activities in two pilot
            schools.
          </p>
          <p>
            During the project, we focus on the STEM subjects for two main
            reasons: they are subjects fairly cultural independent and therefore
            transversal to European curricula and there is a need to increase
            pupils competences on this key subjects. IINTOS web-based open
            source platform has stored resources, existing projects and all
            relevant information related to the internationalization of the
            schools.
          </p>
        </span>
        <h4>In Conclusion</h4>
        <p>
          The project greater aim is to facilitate the exchanges between schools
          across Europe and make more common and usual teaching and learning by
          having an international approach, it also allows the informal exchange
          of practices in the STEM subjects increasing awareness and promoting
          pupil competence development.
        </p>
      </div>
    </Container>
  );
}
