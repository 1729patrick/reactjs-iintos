import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import vallauriImage from '~/assets/images/FotoVallauri.png';

import styles from '~/assets/jss/Views/partnersSection';

const useStyles = makeStyles(styles);
export default function About() {
  const classes = useStyles();

  return (
    <div>
      <h1>
        Istituto di Istruzione Superiore “Giancarlo Vallauri” Fossano (CN)
      </h1>
      <img src={vallauriImage} width="200" height="150" alt="IPS" />
      <div className={classes.section}>
        <p>
          The IIS “Vallauri” is a secondary school with more than 2,200 students
          and 150 teachers and was founded in 1962. It is the biggest secondary
          school for science and technology in the Cuneo Province and offers a
          wide range of courses: ICT, Applied Sciences, Energy, Mechatronics and
          Economics.
        </p>
        <p>
          The IIS “Vallauri” is also an ITS (Istituto Tecnico Superiore –
          Technical High School) centre for students with a secondary education
          diploma. Its courses provide Level 5 EQF qualifications and are
          financed by the Piedmont Region.
        </p>
        <p>
          The IIS “Vallauri” has been making agreements with almost 400
          different local firms to develop innovative work placement projects
          related to ICT, Mechanics and Energy; in addition, some students have
          shown great dynamism and good entrepreneurial skills both during their
          course of studies and in their following careers. For example, the
          Young Platform start-up was founded by six former students in the ICT
          course at Vallauri (https://youngplatform.com/) and the founders of
          Satispay, the revolutionary smart payment system, are from the IIS
          “Vallauri” too (https://www.satispay.com/).
        </p>
        <p>
          The IIS “Vallauri” is the main training centre of a network of schools
          in the didactic and educational field, carrying out many projects
          focused on different methodologies in teaching scientific subjects and
          endorsing significant learning experiences. Moreover, our school aims
          at being a learning hub sending local students to other Europen
          Countries so as to form European citizens that will fertilise our and
          other’s soils.{' '}
        </p>
        <p>
          The IIS “Vallauri” is a Cambridge English Language Assessment Exam
          Preparation Centre, ECDL and CISCO Examination Centre.
        </p>
        <p>
          The IIS “Vallauri” has reached prestigious placements and successes in
          national and international competitions. The areas involved range from
          the pure theoretical ones (as in Physics and Astronomy Olympic Games)
          to the technological and design ones (Computer Science, Mechanics,
          Problem Solving, Zero Robotics and ZR-SAT). The numerous partnerships
          with various universities, study centers, entrepreneurial realities,
          amplify the interest and enthusiasm of young students making
          educational experiments and first-rate successe possible.
        </p>
        <p>
          Furthermore, The IIS “Vallauri” has long collaborated with the
          Politechnic of Turin providing an orientation course addressed to
          fifth-year students who want to start engineering studies, in order to
          strengthen Mathematics and Physics knowledge and skills.
        </p>
        <a href="www.vallauri.edu">www.vallauri.edu</a>
      </div>
    </div>
  );
}
