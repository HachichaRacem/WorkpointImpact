import React from 'react';
import { Icon, Location } from '@rsuite/icons';
import { VscTable, VscCalendar } from 'react-icons/vsc';
import { MdFingerprint, MdDashboard, } from 'react-icons/md';

export const appNavs = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Dashboard',
    to: '/dashboard'
  },
  {
    eventKey: 'calendar',
    icon: <Icon as={VscCalendar} />,
    title: 'Schedule',
    to: '/calendar'
  },
  {
    eventKey: 'tables',
    icon: <Icon as={VscTable} />,
    title: 'Members',
    to: '/table-members'
  },
  {
    eventKey: 'authentication',
    title: 'Authentication',
    icon: <Icon as={MdFingerprint} />,
    to: '/sign-in'
  },
  {
    eventKey: 'map',
    title: 'Map',
    icon: <Location />,
    to: '/map'
  }
];
