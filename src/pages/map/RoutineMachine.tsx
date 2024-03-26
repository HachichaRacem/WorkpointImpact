import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(36.862885, 10.212403), L.latLng(36.853556, 10.185762)],
    lineOptions: {
      styles: [{ color: '#000', weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 2
    },
    show: true,
    addWaypoints: true,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
