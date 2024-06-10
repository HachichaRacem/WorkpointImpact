import React from 'react';
import { Icon } from '@rsuite/icons';
import { VscCalendar, VscLocation, VscPerson, VscMap, VscSettings } from 'react-icons/vsc';
import { MdFingerprint, MdDashboard, MdEmojiTransportation, } from 'react-icons/md';

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
    eventKey: 'map',
    title: 'Map',
    icon: <Icon as={VscMap}/>,
    to: '/map'
  },
  {
    eventKey: 'tables',
    icon: <Icon as={VscSettings} />,
    title: 'Configuration',
    to: '/table',
    children:[
      {
        eventKey:'transport_means',
        icon:<Icon as={VscPerson} />,
        title: 'Members',
        to: '/table-members'
      },
      {
        eventKey:'transport_means',
        icon:<Icon as={MdEmojiTransportation} />,
        title: 'Transport means',
        to: '/table-transport'
      },
      {
        eventKey: 'destination',
        icon: <Icon as={VscLocation} />,
        title: 'Destination',
        to: '/table-destination'
      },

    ]
  },
 /* {
    eventKey: 'authentication',
    title: 'Authentication',
    icon: <Icon as={MdFingerprint} />,
    to: '/sign-in'
  }*/
];
