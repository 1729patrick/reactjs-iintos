import React, { useEffect, useState, useCallback } from 'react';

import { addHours, format } from 'date-fns';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { toast } from 'react-toastify';
import timeGridPlugin from '@fullcalendar/timegrid';
import Alert from '@material-ui/lab/Alert';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import FormModal from './components/Form';

import { Container, ContainerWrap } from './styles';
import validationSchema from '~/validations/event';
import api, { CALENDAR_URL } from '~/services/apiCalendar';
import { useUserContext } from '~/context/UserContext';

const Calendar = () => {
  const { user } = useCallback(useUserContext(), []);

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('events');

      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        editable: true,
        durationEditable: true,
        overlap: true,
        allDay: !event.end.dateTime && !event.end.date,
        description: event.description,
        location: event.location,
      }));
      setEvents(formattedEvents);
    } catch (e) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async ({ event, revert = () => {} }) => {
    const { title, extendedProps, _instance } = event;
    const { start, end } = _instance.range;
    const { description, location } = extendedProps;

    const newEvent = {
      summary: title,
      start: { dateTime: start },
      end: { dateTime: end },
      description,
      location,
    };

    try {
      const response = await api.post(`events`, newEvent);
      const createdEvent = response.data;

      toast.success('Event created with success!');
      setModalOpen(false);

      setEvents([
        ...events,
        { id: createdEvent.event.id, title, start, end, description, location },
      ]);
    } catch (e) {
      revert();
      toast.error(e?.response?.data?.error || 'Error, try again!');
    }
  };

  const handleChangeEvent = async ({ event, revert = () => {} }) => {
    const { id, title, extendedProps, _instance } = event;
    const { start, end } = _instance.range;
    const { description, location } = extendedProps;

    const newEvent = {
      summary: title,
      start: { dateTime: start },
      end: { dateTime: end },
      description,
      location,
    };

    try {
      await api.put(`events/${id}`, newEvent);
      toast.success('Event updated with success!');
      setModalOpen(false);

      const newEvents = events.map(e => {
        if (e.id === id) {
          return { ...e, title, start, end, description };
        }

        return e;
      });

      setEvents(newEvents);
    } catch (e) {
      revert();
      toast.error(e?.response?.data?.error || 'Error, try again!');
    }
  };

  const handleSelect = event => {
    const { start, end } = event;
    const formattedEvent = {
      title: '',
      start,
      end,
      description: '',
      location: '',
    };

    setModalParams({
      initialValues: formattedEvent,
      validationSchema,
      onSubmit: handleCreateEvent,
      submitText: 'Save',
      modalTitle: 'Create a new Event',
    });

    setModalOpen('form');
  };

  const handleEventClick = ({ event }) => {
    const { id, title, extendedProps, _instance } = event;
    const { start, end } = _instance.range;
    const { description, location } = extendedProps;

    const formattedEvent = {
      id,
      title,
      start,
      end,
      description,
      location,
    };

    setModalParams({
      initialValues: formattedEvent,
      validationSchema,
      onSubmit: handleChangeEvent,
      submitText: 'Save',
      modalTitle: 'Event',
    });

    setModalOpen('form');
  };

  return (
    <Container>
      <ContainerWrap>
        {showAlert && (
          <Alert severity="warning">
            You'r must log in google account to see the events
            <a href={`${CALENDAR_URL}/login/${user?.email}`} target="__blank">
              Google Login
            </a>
          </Alert>
        )}

        <FullCalendar
          eventResize={handleChangeEvent}
          eventDrop={handleChangeEvent}
          eventClick={handleEventClick}
          select={handleSelect}
          height="parent"
          views={{
            timeGridWeek: {
              titleFormat: {
                year: 'numeric',
                month: 'long',
              },
              columnHeaderHtml: (date: Date) => {
                return `<div class='column-header-week'><p class='day-ddd'>${format(
                  date,
                  'EEE'
                )}</p><p class='day-d'>${format(date, 'd')}</p></div>`;
              },
            },
            timeGridDay: {
              titleFormat: {
                year: 'numeric',
                month: 'long',
              },
              columnHeaderHtml: (date: Date) => {
                return `<div class='column-header-week'><p class='day-ddd'>${format(
                  date,
                  'EEE'
                )}</p><p class='day-d'>${format(date, 'd')}</p></div>`;
              },
            },
            dayGridMonth: {
              columnHeaderHtml: (date: Date) => {
                return `<div class="column-header-month"><p class="day-ddd">${format(
                  date,
                  'EEE'
                )}</p></div>`;
              },
            },
            timeGrid: {
              slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short',
              },
            },
          }}
          columnHeaderFormat={{
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
            omitCommas: true,
          }}
          header={{
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth, timeGridWeek, timeGridDay',
          }}
          // listMonth
          defaultView="dayGridMonth"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          events={events}
          allDayText="GMT-00"
          slotLabelInterval="01:00"
          slotDuration="00:30"
          themeSystem="standard"
          nowIndicator
          navLinks
          eventBorderColor="transparent"
          selectable
          selectMirror
          buttonIcons={{
            prev: 'left-arrow',
            next: 'right-arrow',
          }}
          scrollTime={format(addHours(new Date(), -4), 'HH:mm')}
        />
      </ContainerWrap>

      <FormModal
        open={modalOpen === 'form'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
};

export default Calendar;
