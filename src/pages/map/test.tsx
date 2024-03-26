import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button, DatePicker, Panel, SelectPicker, Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    name: 'Fares Dammak',
    assigned_vehicule: 'Mercedes-Benz G-Class',
    carburant_impact: '23,361',
    date: '10-02-2024'
  },
  {
    id: 2,
    name: 'Racem Hachicha',
    assigned_vehicule: 'Renault Clio',
    carburant_impact: '23,385',
    date: '11-02-2024'
  },
  {
    id: 3,
    name: 'Taher Ghrab',
    assigned_vehicule: 'Volkswagen Golf 7',
    carburant_impact: '41,256',
    date: '12-02-2024'
  },
  {
    id: 4,
    name: 'Islem Messoud',
    assigned_vehicule: 'Renault Clio',
    carburant_impact: '10,038',
    date: '13-02-2024'
  },
  {
    id: 5,
    name: 'Hanen Allouche',
    assigned_vehicule: 'Volkswagen Golf 7',
    carburant_impact: '1,000',
    date: '14-02-2024'
  },
  {
    id: 6,
    name: 'Racem Choura',
    assigned_vehicule: 'Mercedes-Benz G-Class',
    carburant_impact: '4,786',
    date: '15-02-2024'
  }
];

const Map = () => {
  const data = ['Member X', 'Member Y', 'Member Z'].map(item => ({ label: item, value: item }));
  return (
   <Panel>
        <Column>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DatePicker
            format="MMM dd, yyyy"
            size="md"
            style={{ width: 200 }}
            placeholder="Select date"
            />
            <SelectPicker
            placeholder="Select member"
            size="md"
            defaultValue="Member X"
            data={data}
            style={{ width: 180, paddingLeft: 20 }}
            />
            <div style={{textAlign:'center', paddingLeft: 20}}>
                <Button appearance="primary">Get Report</Button>
            </div>
        </div>
        <div style={{ paddingTop: 20 }}>
            <MapContainer center={[36.8065, 10.1815]} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[36.8065, 10.1815]}>
            <Popup>
                Tunis, Tunisia <br /> This is the center.
            </Popup>
            </Marker>
            </MapContainer>
        </div>
        </Column>
        <Column>
        <Table height={300} data={data} rowKey="id">
        <Column width={150}>
          <HeaderCell>Member Name </HeaderCell>
          <Cell>
            {rowData => {
              return (
                <p >
                  {rowData.name}
                </p>
              );
            }}
          </Cell>
        </Column>

        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>Assigned Vehicule</HeaderCell>
          <Cell>
            {rowData => {
              return (
                <p >
                  {rowData. assigned_vehicule}
                </p>
              );
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
        </Column>
    </Panel> 
  );
};

export default Map;
