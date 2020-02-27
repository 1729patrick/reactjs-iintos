import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Events, Event } from './styles';

export default function ProjectsCard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

  const fetchOutputs = async () => {
    try {
      const response = await api.get('projects', {
        params: { destination: 'MOBILITY' },
      });

      setProjects(response.data);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchOutputs();
  }, []);

  return (
    <Events>
      {projects.map(project => (
        <Event key={project.id}>
          <p>{project.title}</p>

          <div>
            <Link to={`/projects/details/${project.id}`}>Show Project</Link>
          </div>
        </Event>
      ))}
    </Events>
  );
}
