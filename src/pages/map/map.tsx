import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button, DatePicker, Panel, SelectPicker, Table } from 'rsuite';
import RoutineMachine from './RoutineMachine';

const { Column, HeaderCell, Cell } = Table;

const Map = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
 
  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:4000/members'); // Assuming your backend is running locally
      if (response.ok) {
        const data = await response.json();
        setMembers(data.map(member =>({label: member.fullName,value: member.id})));
             } else {
        console.error('Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
    fetchMembers();
  }, []);
  const handleMemberChange = (value) => {
    setSelectedMember(value);
  };
  
  const date = [
    {
      id: 1,
      name: 'Hopital Borguiba',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '23,361',
      date: '10-02-2024'
    },
    {
      id: 2,
      name: 'Hopital Razi',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '23,385',
      date: '11-02-2024'
    },
    {
      id: 3,
      name: 'Cabinet Ghrab',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '41,256',
      date: '12-02-2024'
    },
    {
      id: 4,
      name: 'Pharmacie DMK',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '10,038',
      date: '13-02-2024'
    },
    {
      id: 5,
      name: 'Centre Allouche',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '1,000',
      date: '14-02-2024'
    },
    {
      id: 6,
      name: 'Vetérinaire Choura',
      assigned_vehicule: 'Renault Clio',
      carburant_impact: '4,786',
      date: '15-02-2024'
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
          data={members}
          defaultValue=""
          value={selectedMember}
          onChange={handleMemberChange }
          style={{ width: 180, paddingLeft: 20 }}
        />
        <div style={{ textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
          <Button appearance="primary">Get Report</Button>
          <div
          style={{
            backgroundColor: 'white',
            border: '1px solid lightgray',
            padding: '8px',
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
          <RoutineMachine />
        </MapContainer>
        <Panel className="card" header="Destination by Delegate and Date ">
          <Table height={300} data={date} rowKey="id">
            <Column width={150}>
              <HeaderCell>Destination </HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.name}</p>;
                }}
              </Cell>
            </Column>
            <Column flexGrow={1} minWidth={100}>
              <HeaderCell>Vehicule used</HeaderCell>
              <Cell>
                {rowData => {
                  return <p>{rowData.assigned_vehicule}</p>;
                }}
              </Cell>
            </Column>

            <Column width={100}>
              <HeaderCell>Carbon Impact</HeaderCell>
              <Cell dataKey="carburant_impact" />
            </Column>

            <Column width={130}>
              <HeaderCell>Date</HeaderCell>
              <Cell dataKey="date" />
            </Column>
          </Table>
        </Panel>
      </>
    </Panel>
  );
};

export default Map;
