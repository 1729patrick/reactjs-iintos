import React, { useEffect, useState } from 'react';

import { addHours, format } from 'date-fns';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { toast } from 'react-toastify';
import DeleteModal from './components/Delete';
import FormModal from './components/Form';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import timeGridPlugin from '@fullcalendar/timegrid';

import { Container, ContainerWrap } from './styles';
import validationSchema from '~/validations/event';
import api from '~/services/apiCalendar';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

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
      toast.error(e?.response?.data?.error || 'Error, try again!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChangeEvent = async ({ event, revert = () => {} }) => {
    const { id, title, extendedProps, _instance } = event;
    const { start, end } = _instance.range;
    const { description } = extendedProps;

    const newEvent = {
      summary: title,
      start: { dateTime: start },
      end: { dateTime: end },
      description,
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
      title: 'a',
      start,
      end,
      description: 'a',
      location: '',
    };

    // setModalParams({
    //   initialValues: formattedEvent,
    //   validationSchema,
    //   onSubmit: () => console.log('aaaa'),
    //   submitText: 'Save',
    //   modalTitle: 'Event',
    // });

    // setModalOpen('form');
  };

  const handleEventClick = ({ event }) => {
    const { id, title, extendedProps, _instance } = event;
    const { start, end } = _instance.range;
    const { description } = extendedProps;

    const formattedEvent = {
      id,
      title,
      start,
      end,
      description,
    };

    const onSubmit = ({ id, title, start, end, description }) => {
      // eslint-disable-next-line no-shadow
      const event = {
        id,
        title,
        _instance: { range: { start, end } },
        extendedProps: { description },
      };

      handleChangeEvent({ event });
    };

    setModalParams({
      initialValues: formattedEvent,
      validationSchema,
      onSubmit,
      submitText: 'Save',
      modalTitle: 'Event',
    });

    setModalOpen('form');
  };

  return (
    <Container>
      <ContainerWrap>
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
            center: 'title myCustomButton',
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
      {/* <FormModal
        open={modalOpen === 'form'}
        setOpen={setModalOpen}
        {...modalParams}
      />
      <DeleteModal
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        {...modalParams}
      /> */}
    </Container>
  );
};

export default Calendar;
