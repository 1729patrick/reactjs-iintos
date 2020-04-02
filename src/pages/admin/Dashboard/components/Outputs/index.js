import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import EmptyMessage from '~/components/EmptyMessage';
import { useUserContext } from '~/context/UserContext';

import { Events, Event } from './styles';

export default function OutputsCard() {
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(false);
  const { user } = React.useCallback(useUserContext(), []);
  const isUserIIntos = React.useMemo(
    () => user?.role === 'IINTOS-Admin' || user?.role === 'IINTOS-Partner',
    [user]
  );
  const fetchOutputs = async () => {
    try {
      let response = '';

      if (isUserIIntos) {
        response = await api.get('projects', {
          params: { destination: 'IINTOS' },
        });
      } else {
        response = await api.get('projects', {
          params: { destination: 'MOBILITY' },
        });
      }
      setOutputs(response.data);
      if (response.data.length === 0) {
        setError(true);
      }
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
      {error && <EmptyMessage />}
    </Events>
  );
}
