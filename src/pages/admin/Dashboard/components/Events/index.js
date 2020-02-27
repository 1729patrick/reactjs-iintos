import React, { useEffect, useState } from 'react';
import { format, addHours } from 'date-fns';
import { Link } from 'react-router-dom';
import api from '~/services/apiCalendar';
import EmptyMessage from '~/components/EmptyMessage';

import { Events, Event } from './styles';

export default function EventsCard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('events', {
        params: { timeMin: addHours(new Date(), -6) },
      });

      const responseEvents = response.data.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
      }));

      const formattedEvents = responseEvents.map(event => {
        return {
          ...event,
          formattedStart: format(new Date(event.start), 'yyyy-MM-dd HH:mm'),
        };
      });

      setEvents(formattedEvents);
      if (formattedEvents.data.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Events>
      {events.map(event => (
        <Event key={event.id}>
          <p>{event.title}</p>

          <div>
            <span>{event.formattedStart}</span>
            <Link to="/calendar">Show in Calendar</Link>
          </div>
        </Event>
      ))}
      {error && <EmptyMessage />}
    </Events>
  );
}
