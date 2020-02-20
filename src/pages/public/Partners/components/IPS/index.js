import React, { useEffect, useState } from 'react';
import ipsImage from '~/assets/images/40anos.png';

export default function About() {
  return (
    <div>
      <h1>Polytechnic Institute of Setúbal</h1>
      <img src={ipsImage} width="300" height="200" alt="IPS" />
      <p>
        Created in 1979, IPS is a public institution of higher education
        seeking, permanently and in association with its social partners, to
        contribute to the development of society, in general, and of the Setúbal
        region, in particular, through tertiary training activities, research
        and services provision, contributing to the creation, development,
        dissemination and transfer of knowledge, as well as the promotion of
        science and culture.
      </p>
      <p>
        With more than 6000 students and employing more than 900 teaching and
        non-teaching staff, IPS assumes as primordial the training of
        professionals with high technical and scientific expertise, offering 32
        bachelor degrees and 21 master degrees, besides post-secondary training
        (CTeSP) and post-graduation diplomas.
      </p>
      <p>
        IPS comprises 5 Schools in the areas of Education, Technology, Business
        & Administration and Health, that are distributes in two campi (in
        Setúbal and Barreiro). The institution has well-equipped laboratories,
        documentation centres, audio-visual equipment and computer facilities,
        which are available to its students and academic and non-academic staff.
      </p>
      <p>
        IPS integrates research and development, as well as knowledge and
        technology transfer as an indispensable part of its action, not only as
        a support to its training activities, but also as a way of interaction
        and commitment with its community, providing consulting, research and
        auditing services. In this scope, IPS has created an innovation, R&D and
        entrepreneurship support office (UAIIDE) that fully assists researchers,
        entrepreneurs, students and the regional community in their activities
        and projects.
      </p>
      <p>
        Also, the institution has the strategic goal to be an open and
        international community, being strongly committed with establishment of
        international partnerships and alliances. At this level, the institution
        has an international office (CIMOB-IPS) which provides support to
        mobility and international cooperation. There are several bilateral
        agreements established not only with European higher education
        institutions, but also with South American and Asian organizations, that
        have been allowing a fruitful exchange of students and staff. In what
        refers to project cooperation, IPS is presently involved in several
        European projects, namely under Erasmus+ and Horizon 2020 programs.
      </p>
    </div>
  );
}
