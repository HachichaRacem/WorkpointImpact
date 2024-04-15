import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button, DatePicker, Panel, SelectPicker, Table } from 'rsuite';
import RoutineMachine from './RoutineMachine';
import L from 'leaflet';


const { Column, HeaderCell, Cell } = Table;

const Map = () => {


  const [] = useState([]);
  const [points, setPoints] = useState([])
  const loadUsersData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const response = await fetch(`http://localhost:3000/destinations`, options);
      const responseData = await response.json(); 
      console.log('responseData', responseData)
      const result:any = []
      responseData.map(point => { 
        result.push(L.latLng(point.longitude, point.latitude) ) 
      })
      setPoints(result)
      // const longitude = responseData.map(item => item.longitude); 
      // console.log(longitude); 
      
      // const latitude = responseData.map(item => item.latitude);
      // console.log(latitude);
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };
  
  useEffect(() => {
    loadUsersData();
  }, []);

  
  const data = ['Member X', 'Member Y', 'Member Z'].map(item => ({ label: item, value: item }));
  const date = [
    {
      id: 1,
      name: 'Hopital Borguiba',
      duration: '13 min',
      destination : '8.0 Km',
      carburant_impact: '23,361',
      date: 'AM'
    },
    {
      id: 2,
      name: 'Hopital Razi',
      duration: 'Renault Clio',
      carburant_impact: '23,385',
      date: 'AM'
    },
    {
      id: 3,
      name: 'Cabinet Ghrab',
      duration: 'Renault Clio',
      carburant_impact: '41,256',
      date: 'AM'
    },
    {
      id: 4,
      name: 'Pharmacie DMK',
      duration: 'Renault Clio',
      carburant_impact: '10,038',
      date: 'PM'
    },
    {
      id: 5,
      name: 'Centre Allouche',
      duration: 'Renault Clio',
      carburant_impact: '1,000',
      date: 'PM'
    },
    {
      id: 6,
      name: 'Vetérinaire Choura',
      duration: 'Renault Clio',
      carburant_impact: '4,786',
      date: 'PM'
    }
  ];
  return (
    <Panel>
      <div style={{ display: 'flex', justifyContent: 'left', paddingBottom: 20 }}>
        <DatePicker
          format="MMM dd, yyyy"
          size="md"
          style={{ width: 200 }}
          placeholder="Select date"
        />
        <SelectPicker
          placeholder="Select member"
          size="md"
          data={data}
          style={{ width: 180, paddingLeft: 20 }}
        />
        <div style={{ textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
          <Button appearance="primary">Get Report</Button>
          <div
          style={{
            backgroundColor: 'white',
            border: '1px solid lightgray',
            padding: '8px',
            marginLeft: '20px',
            borderRadius: '5px',
            marginBottom: 10,
            display: 'inline-block'
          }}
        >
          <div style={{ fontSize: '15px' }}>
            <span style={{ color: 'blue'}}>Carbon Impact : </span>1300.50
          </div>
        </div>
          <Button appearance="primary" style={{ marginLeft: 20 }}>
            Optimize
          </Button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginLeft: 20, paddingLeft: '20', paddingRight: '20' }}>
        
      </div>
      <>
        <MapContainer center={[36.8065, 10.1815]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
              {points.length > 0 && <RoutineMachine points={points} /> }
          
          
          {/* <RoutineMachine longitude = {longitude} /> */}
        </MapContainer>
        <Panel className="card" header="Destinations by Delegate and Date ">
          <Table height={300} data={date} rowKey="id">
            <Column width={200}>
              <HeaderCell>Start Point </HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.name}</p>;
                }}
              </Cell>
            </Column>

            <Column width={200}>
              <HeaderCell>End Point </HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.name}</p>;
                }}
              </Cell>
            </Column>    
            
            <Column flexGrow={1} minWidth={80}>
              <HeaderCell>Distence</HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.destination}</p>;
                }}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={80}>
              <HeaderCell>Duration</HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.duration}</p>;
                }}
              </Cell>
            </Column>    

            <Column width={100}>
              <HeaderCell>Carbon Impact</HeaderCell>
              <Cell dataKey="carburant_impact" />
            </Column>

            <Column width={130}>
              <HeaderCell>Slot</HeaderCell>
              <Cell dataKey="date" />
            </Column> 
          </Table>
        </Panel>
      </>
    </Panel>
  );
};

export default Map;
