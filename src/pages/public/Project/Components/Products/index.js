import React, { useState, useEffect } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ipsImage from '~/assets/images/IPS.jpg';
import olomoucImage from '~/assets/images/UP_logo_horizont_en.png';
import saramagoImage from '~/assets/images/Saramago.jpg';
import vallauriImage from '~/assets/images/vallauriLogo.jpg';

import { Container } from './styles';
import api from '~/services/api';

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
    link: 'http://www.ips.pt/ips_si/web_page.inicial',
    logo: ipsImage,
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
    link: 'https://edis.upol.cz/cc',
    logo: olomoucImage,
  },
  {
    title: 'Group of Schools José Saramago (Portugal)',
    description: `Group of Schools José Saramago
  with about 736 students is inserted in the territory belonging to the
  Municipality of Palmela, Setúbal District (about 40 KM, south of
  Lisbon). It is integrated in an Educational Territory of Priority
  Intervention (ETPI) project since 2009.`,
    link: 'http://www.aejs.pt/home/',
    logo: saramagoImage,
  },
  {
    title: 'Istituto “Giancarlo Vallauri” Fossano (Italy)',
    description: `The IIS “Vallauri” is a secondary school with more than 2,200 students
  and 150 teachers and was founded in 1962. It is the biggest secondary
  school for science and technology in the Cuneo Province and offers a
  wide range of courses: ICT, Applied Sciences, Energy, Mechatronics and
  Economics.`,
    link: 'https://www.satispay.com/',
    logo: vallauriImage,
  },
];
function Partners() {
  const [open, setOpen] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('outputResults');
      setProducts(response.data);
    };

    fetchResults();
  }, []);

  return (
    <Container>
      <h1>
        Within the scope of this project, the following materials were produced:
      </h1>
      {products.map(({ title, description, files }, index) => (
        <div key={title} onClick={() => setOpen(open === index ? null : index)}>
          <span>
            <p>{title}</p>
            {open === index ? <ExpandLess /> : <ExpandMore />}
          </span>

          <Collapse in={open === index} timeout="auto" unmountOnExit>
            {description}

            {files.length && <h4>{files.length > 1 ? 'Files:' : 'File:'}</h4>}
            {files.map(({ id, url, name }) => (
              <a href={url} target="_blank" key={id}>
                {name}
              </a>
            ))}
          </Collapse>
        </div>
      ))}
    </Container>
  );
}

export default Partners;
