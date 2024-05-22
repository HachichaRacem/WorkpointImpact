import { ArrowLeftLine, ArrowRightLine, FileUpload } from '@rsuite/icons';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button, IconButton, Message, SelectPicker, useToaster } from 'rsuite';
import { addScheduleData, uploadScheduleData } from '@/services/schedule.service';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const CalendarHeader = ({ refs, users, setUser, user, setLoading }) => {
  const toaster = useToaster();

  const mapRef = useRef(null);
  const map = useRef<any>(null);
  const routeRef = useRef<any>(null);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const [title, setTitle] = useState(
    months[new Date().getMonth()] + ' ' + new Date().getFullYear()
  );

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

  const nextHandle = () => {
    refs.current.getApi().next();
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const prevHandle = () => {
    refs.current.getApi().prev();
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const monthHandle = () => {
    refs.current.getApi().changeView('dayGridMonth');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const weekHandle = () => {
    refs.current.getApi().changeView('timeGridWeek');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const dayHandle = () => {
    refs.current.getApi().changeView('timeGridDay');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };

  const handleFileUpload = async (e) => {
    setLoading({ open: true, message: 'Uploading file ...' });
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await uploadScheduleData(formData);
      console.log('response', response);
      if (response.status === 200) {
        
        const groupedData = response.data.reduce((acc, point) => {
          const key = `${point.user}-${new Date(point.date).toDateString()}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(point);
          return acc;
        }, {});
  
        for (const key in groupedData) {
          const points = groupedData[key];
          const latLngPoints = points.map((point) =>
            L.latLng(point.latitude, point.longitude)
          );
  
          let totalDistance = 0;
          let totalDuration = 0;
  
          if (latLngPoints.length > 1) {
            if (map.current && L.Routing) {
              const route = L.Routing.control({
                waypoints: latLngPoints,
              });
          
              route.on('routesfound', async function (e) {
                const routes = e.routes;
                const summary = routes[0].summary;
                totalDuration = Math.round((summary.totalTime % 3600) / 60);
                totalDistance = summary.totalDistance / 1000;
  
                // Call addScheduleData with the current group's data and total distance/duration
                const res = await addScheduleData({
                  scheduleData: points,
                  totalDuration,
                  totalDistance,
                });
  
                if (res.status === 200) {
                  toaster.push(
                    <Message closable showIcon type="success" duration={9000}>
                      Added successfully
                    </Message>,
                    {
                      placement: 'topCenter',
                    }
                  );
                } else {
                  toaster.push(
                    <Message closable showIcon type="error" duration={9000}>
                      {res.message}
                    </Message>,
                    {
                      placement: 'topCenter',
                    }
                  );
                }
  
                setLoading({ open: false, message: '' });
              });
              
  
              route.addTo(map.current);
            }
          } else if (latLngPoints.length === 1) {
            const res = await addScheduleData({
              scheduleData: points,
              totalDuration: 0,
              totalDistance: 0,
            });
  
            if (res.status === 200) {
              toaster.push(
                <Message closable showIcon type="success" duration={9000}>
                  Added successfully
                </Message>,
                {
                  placement: 'topCenter',
                }
              );
            } else {
              toaster.push(
                <Message closable showIcon type="error" duration={9000}>
                  {res.message}
                </Message>,
                {
                  placement: 'topCenter',
                }
              );
            }
  
            
          }
        }
      } else {
        console.error('Error uploading file');
      }
    } catch (e: any) {
      console.log('e', e.message);
      toaster.push(
        <Message closable showIcon type="error" duration={9000}>
          {e.message}
        </Message>,
        {
          placement: 'topCenter',
        }
      );
    }
    setLoading({ open: false, message: '' });
    toaster.push(
      <Message closable showIcon type="success" duration={9000}>
        Added successfully
      </Message>,
      {
        placement: 'topCenter',
      }
    );
    
  };
  

  return (
    <div>
      <div ref={mapRef} id="map" style={{ display: 'none', height: '100vh', width: '100%' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SelectPicker
          placeholder="Select member"
          size="md"
          data={users}
          style={{ width: 220, paddingTop: 3, marginBottom: 30 }}
          onChange={value => {
            setUser(value);
            setLoading(true);
          }}
          value={user}
        />
        <div style={{ textAlign: 'right', paddingTop: 3, marginBottom: 30 }}>
          <label
            htmlFor="uploadInput"
            style={{
              color: 'white',
              backgroundColor: '#3498ff',
              padding: '9px 10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Upload File
            <input
              type="file"
              id="uploadInput"
              name="uploadInput"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 20,
          paddingTop: 5
        }}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <IconButton icon={<ArrowLeftLine />} onClick={() => prevHandle()} size="lg" />
            <IconButton icon={<ArrowRightLine />} onClick={() => nextHandle()} size="lg" />
          </div>
        </div>
        <h3 style={{ textAlign: 'center', paddingRight: 100 }} id="title">
          {title}
        </h3>
        <div>
          <Button onClick={() => monthHandle()}>Month</Button>
          <Button onClick={() => weekHandle()}>Week</Button>
          <Button onClick={() => dayHandle()}>Day</Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
