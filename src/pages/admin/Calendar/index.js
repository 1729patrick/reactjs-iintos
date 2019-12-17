import React from 'react';

import { addHours, format } from 'date-fns';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import timeGridPlugin from '@fullcalendar/timegrid';

import { Container, CalendarWrap } from './styles';

import Events from './Events';

const Calendar = () => {
  return (
    <Container>
      <Events />

      <CalendarWrap>
        <FullCalendar
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
          events={[
            {
              title: 'Event1',
              start: '2019-06-20',
              color: 'blue',
            },
            {
              title: 'Event2',
              start: '2019-06-21',
              color: '#3788d8',
              textColor: 'white',
            },
            {
              title: 'Event2',
              start: '2019-06-22',
              color: '#3788d8',
              textColor: 'white',
            },
            {
              title: 'Event2',
              start: '2019-06-23',
              color: '#3788d8',
              textColor: 'white',
            },
            {
              title: 'Event2',
              start: '2019-06-24',
              color: '#3788d8',
              textColor: 'white',
            },
            {
              title: 'Event2',
              start: '2019-06-25',
              color: '#3788d8',
              textColor: 'white',
            },
          ]}
          allDayText="GMT-03"
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
      </CalendarWrap>
    </Container>
  );
};

export default Calendar;
