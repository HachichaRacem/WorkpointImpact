import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = props => {
  const { points, setDistance, setDuration } = props;
  // const [data, setData] = useState([])

  // console.log('points', props.points)

  // useEffect(() => {
  //   const result:any = []
  //   props.points.map(point => {
  //     result.push(L.latLng(point.longitude, point.latitude) )
  //   })

  //   console.log('result', result)
  //   setData(result)

  // }, [props.points])

  const instance = L.Routing.control({
    // waypoints: [L.latLng(36.8023, 10.0830), L.latLng(36.80563, 10.0830)],
    waypoints: points,
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

  instance.on('routesfound', function (e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    console.log('🚀 ~ summary:', summary);
    setDistance(summary.totalDistance / 1000);
    setDuration(Math.round((summary.totalTime % 3600) / 60));
    // alert distance and time in km and minutes
    // alert(
    //   'Total distance is ' +
    //     summary.totalDistance / 1000 +
    //     ' km and total time is ' +
    //     Math.round((summary.totalTime % 3600) / 60) +
    //     ' minutes'
    // );
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
