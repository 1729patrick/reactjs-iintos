import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Events, Event } from './styles';

export default function ActivitiesCard() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(false);

  const fetchOutputs = async () => {
    try {
      const response = await api.get('activities');

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
    </Events>
  );
}
