import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
import { INITIAL_EVENTS } from './event-utils';
import EventModal from './EventModal';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
  const [editable, setEditable] = React.useState(false);

  const [users, setUsers] = useState([]);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo);
    setEditable(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo);
    setEditable(true);
  };

  const calendarRef = useRef(null);

  const loadData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const response = await fetch('http://localhost:3000/members', options);
      const usersResult = await response.json();

      const fullName = usersResult.map(item => item.fullName);

      setUsers(fullName);
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContent className="calendar-app">
      <CalendarHeader refs={calendarRef} users={users} />
      <FullCalendar
        headerToolbar={false}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        initialView="dayGridMonth"
        weekends
        editable
        selectable
        selectMirror
        dayMaxEvents
        nextDayThreshold={'09:00:00'}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
      />
      <EventModal
        open={editable}
        onClose={() => setEditable(false)}
        onAddEvent={() => {
          setEditable(false);
        }}
      />
    </PageContent>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  const { timeText, event } = eventContent;
  return (
    <>
      {timeText && (
        <>
          <div className="fc-daygrid-event-dot"></div>
          <div className="fc-event-time">{eventContent.timeText}</div>
        </>
      )}
      <div className="fc-event-title">{event.title}</div>
    </>
  );
}

export default Calendar;
