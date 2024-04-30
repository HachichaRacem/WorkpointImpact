import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
// import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapComponent = props => {
  const { points, setDistance, setDuration, destinations } = props;
  console.log('🚀 ~ destinations:', destinations);

  const mapRef = useRef(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      map.current = L.map(mapRef.current, {
        center: [36.8065, 10.1815],
        zoom: 13
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.current);
    }
  }, []);

  useEffect(() => {
    if (map.current) {
      if (L.Routing) {
        // const routeControl = L.Routing.control({
        //   waypoints: points,
        //   // waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
        //   lineOptions: {
        //     styles: [{ color: '#000', weight: 4 }],
        //     extendToWaypoints: true,
        //     missingRouteTolerance: 2,
        //   },
        //   show: true,
        //   // addWaypoints: true,
        //   routeWhileDragging: true,
        //   fitSelectedRoutes: true,
        //   showAlternatives: false
        // }).addTo(map.current);

        const routeControl = L.Routing.control({
          plan: L.Routing.plan(points, {
            // createMarker: function (i, wp) {
            //   return L.marker(wp.latLng, {
            //     draggable: false
            //   })
            //     .bindPopup('test')
            //     .openPopup();
            // }
            createMarker: function (i, wp) {
              console.log('🚀 ~ useEffect ~ wp:', wp.latLng);
              const destination = destinations.find(
                item =>
                  Number(item.Destination.latitude) == Number(wp.latLng.lat) &&
                  Number(item.Destination.longitude) == Number(wp.latLng.lng)
              );
              console.log('🚀 ~  destination:', destination);

              const marker = L.marker(wp.latLng, {
                draggable: false
              })
                // .setLatLng(wp.latLng)
                .bindPopup(`Destination ${i + 1} <br/> <b>${destination.Destination.name}</b>`);
              marker.on('click', function (e) {
                this.openPopup();
              });
              // setTimeout(() => {
              //   marker.openPopup();
              // }, 100);
              return marker;
            }
          })
        }).addTo(map.current);

        routeControl.on('routesfound', function (e) {
          const routes = e.routes;
          const summary = routes[0].summary;
          console.log('🚀 ~ routes:', routes);
          setDistance(summary.totalDistance / 1000);
          setDuration(Math.round((summary.totalTime % 3600) / 60));
        });

        // points.forEach((point, index) => {
        //   // const popup = L.popup({
        //   //   closeButton: false,
        //   //   className: 'custom-popup'
        //   // }).setContent('<b>Point ' + (index + 1) + '</b>');

        //   // L.marker(point).addTo(map.current);
        //   // .bindPopup(popup)
        //   // .on('popupopen', function(e) {
        //   // })
        //   // .openPopup();

        //   L.marker(point)
        //     .bindPopup('<b>Point ' + (index + 1) + '</b>')
        //     .addTo(map.current);

        //   // marker.on('click', function (e) {
        //   //   this.openPopup();
        //   // });
        // });
      }
    }
  }, [points]);

  console.log('🚀 ~ MapComponent ~ points:', points);

  // useEffect(() => {
  //   if (L.Routing) {
  //     L.Routing.control({
  //       // waypoints: [L.latLng(36.8023, 10.0830), L.latLng(36.80563, 10.0830)],
  //       waypoints: points,
  //       lineOptions: {
  //         styles: [{ color: '#000', weight: 4 }],
  //         extendToWaypoints: true,
  //         missingRouteTolerance: 2
  //       },
  //       show: true,
  //       addWaypoints: true,
  //       routeWhileDragging: true,
  //       fitSelectedRoutes: true,
  //       showAlternatives: false
  //     }).addTo(mapRef.current);
  //   }
  // }, [points]);

  return (
    // <MapContainer center={[51.505, -0.09]} zoom={13}>
    //   <div ref={map} id="map" className="map-container" />
    //  <TileLayer
    //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    // />
    //  </MapContainer>
    <div ref={mapRef} id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default MapComponent;
