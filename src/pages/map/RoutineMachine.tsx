import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';




const createRoutineMachineLayer = (props) => {

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
    waypoints: props.points,
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
