import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import EmptyMessage from '~/components/EmptyMessage';

import { Events, Event } from './styles';

export default function ActivitiesCard() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState();

  const fetchOutputs = async () => {
    try {
      const response = await api.get('activities');

      if (response.data.length === 0) {
        setError(true);
      }
      setActivities(response.data);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchOutputs();
  }, []);

  return (
    <Events>
      {activities.map(activity => (
        <Event key={activity.id}>
          <p>{activity.title}</p>

          <div>
            <Link to={`/projects/details/${activity.projectId}/activities`}>
              Show in Project
            </Link>
          </div>
        </Event>
      ))}

      {error && <EmptyMessage message="No activities available!" />}
    </Events>
  );
}
