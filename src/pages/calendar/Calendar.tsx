import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
import { INITIAL_EVENTS } from './event-utils';
import EventModal from './EventModal';
import CalendarHeader from './CalendarHeader';
import { addDays, format, startOfMonth } from 'date-fns';
import { uniqueId } from 'lodash';
import { Loader } from 'rsuite';

const Calendar = () => {
  const [editable, setEditable] = React.useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo);
    // setEditable(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo);
    console.log('clickInfoclickInfo', clickInfo.event?._def);

    setEventInfo(data?.find((item: any) => item.id == clickInfo.event?._def?.publicId));
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
      const response = await fetch('http://51.210.242.227:5200/members', options);
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

  useEffect(() => {
    if (user) {
      fetchScheduleUser();
    } else {
      setLoading(false);
      setData([]);
    }
  }, [user]);

  const today = new Date();
  const firstDay = startOfMonth(today);
  const todayStr = format(today, 'yyyy-MM-dd');

  const fetchScheduleUser = async () => {
    const response = await fetch(`http://51.210.242.227:5200/schedule/${user}`);
    const result = await response.json();
    const res = result.map(item => ({
      id: item._id,
      title: item.destination?.name,
      allDay: false,
      start:
        format(new Date(item.Date), 'yyyy-MM-dd') +
        `${item.Slot == 'AM' ? 'T09:00:00' : 'T13:00:00'}`,
      end:
        format(new Date(item.Date), 'yyyy-MM-dd') +
        `${item.Slot == 'AM' ? 'T12:00:00' : 'T18:00:00'}`,

      address: item.Adresse,
      car: item.car
    }));

    setData(res);
    setLoading(false);
  };

  return (
    <PageContent className="calendar-app">
      <CalendarHeader
        refs={calendarRef}
        users={users}
        setUser={setUser}
        user={user}
        setLoading={setLoading}
      />
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
        events={data}
        initialEvents={data}
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
        eventInfo={eventInfo}
      />
      {loading && <Loader backdrop content="loading..." vertical style={{ zIndex: 9999 }} />}
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
          {/* <div className="fc-event-time">{eventContent.timeText}</div> */}
        </>
      )}
      <div className="fc-event-title">{event.title}</div>
    </>
  );
}

export default Calendar;
