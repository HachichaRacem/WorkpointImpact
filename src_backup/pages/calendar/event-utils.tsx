import { EventInput } from '@fullcalendar/react';
import uniqueId from 'lodash/uniqueId';
import { startOfMonth, addDays, format} from 'date-fns';

const today = new Date();
const firstDay = startOfMonth(today);
const todayStr = format(today, 'yyyy-MM-dd');

console.log('TODAY' + todayStr);

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: uniqueId(),
    title: 'Destination A',
    allDay: false,
    start: format(addDays(firstDay, 3), 'yyyy-MM-dd') + 'T09:00:00',
    end: format(addDays(firstDay, 3), 'yyyy-MM-dd') + 'T10:00:00'
  },
  {
    id: uniqueId(),
    title: 'Destination B',
    allDay: false,
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T10:00:00'
  },
  {
    id: uniqueId(),
    title: 'Destination C',
    allDay: false,
    start: todayStr + 'T11:00:00',
    end: todayStr + 'T12:00:00'
  },
  {
    id: uniqueId(),
    title: 'Destination D',
    allDay: false,
    start: format(addDays(today, 1), 'yyyy-MM-dd') + 'T10:00:00',
    end: format(addDays(today, 1), 'yyyy-MM-dd') + 'T11:00:00'
  },
  {
    id: uniqueId(),
    title: 'Destination E',
    allDay: false,
    start: format(addDays(today, 5), 'yyyy-MM-dd') + 'T08:00:00',
    end: format(addDays(today, 5), 'yyyy-MM-dd') + 'T09:00:00'
  },
];
