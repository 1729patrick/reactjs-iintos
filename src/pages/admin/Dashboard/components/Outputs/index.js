import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Events, Event } from './styles';

export default function OutputsCard() {
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(false);

  const fetchOutputs = async () => {
    try {
      const response = await api.get('projects', {
        params: { destination: 'IINTOS' },
      });

      setOutputs(response.data);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchOutputs();
  }, []);

  return (
    <Events>
      {outputs.map(output => (
        <Event key={output.id}>
          <p>{output.title}</p>

          <div>
            <Link to={`/outputs/details/${output.id}`}>Show Output</Link>
          </div>
        </Event>
      ))}
    </Events>
  );
}
