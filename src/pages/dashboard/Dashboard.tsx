import React, { useEffect, useState } from 'react';
import { Row, Col, Panel } from 'rsuite';
import * as images from '../../images/charts';
import { MapContainer, TileLayer } from 'react-leaflet';
import DataTable from './DataTable';
import ScatterIcon from '@rsuite/icons/Scatter';

const Dashboard = () => {
  const [membersCount, setMembersCount] = useState<number>(0);
  const [destinationsCount, setDestinationsCount] = useState<number>(0);
  const [transportsCount, setTransportsCount] = useState<number>(0);
  const [delegatesData, setDelegatesData] = useState<any>([]);

  const loadData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const [members, transports, destinations] = await Promise.all([
        fetch('http://localhost:3000/members', options),
        fetch('http://localhost:3000/transports', options),
        fetch('http://localhost:3000/destinations', options)
      ]);
      const [_membersData, transportsData, destinationsData] = await Promise.all([
        members.json(),
        transports.json(),
        destinations.json()
      ]);
      setDelegatesData(_membersData);
      setMembersCount(_membersData.length);
      setDestinationsCount(destinationsData.length);
      setTransportsCount(transportsData.length);
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };
  useEffect(() => {
    loadData();
  });
  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-red">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Total Members</div>
            <div className="value">{membersCount}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-green">
            <img className="chart-img" src={images.VVICon} />
            <div className="title">Total Destination</div>
            <div className="value">{destinationsCount}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-blue">
            <img className="chart-img" src={images.UVIcon} />
            <div className="title">Total Vehicles </div>
            <div className="value">{transportsCount}</div>
          </Panel>
        </Col>
      </Row>

      <Row gutter={30} className="dashboard-header2">
        <Col xs={16}>
          <DataTable data={delegatesData} />
        </Col>
        <Col xs={8} style={{ paddingTop: 30 }}>
          <div style={{ width: '100%', backgroundColor: 'white', borderRadius: 8 }}>
            <Panel className="trend-box bg-gradient-green" style={{ height: '52vh' }}>
              <ScatterIcon
                style={{
                  position: 'absolute',
                  left: '34%',
                  top: '25%',
                  width: 160,
                  height: 160,
                  color: 'white',
                  opacity: '0.6'
                }}
              />
              <div
                style={{
                  color: 'white',
                  position: 'absolute',
                  bottom: 20,
                  fontSize: 26
                }}
              >
                Total Carbon
              </div>
              <div
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 32,
                  position: 'absolute',
                  right: 30,
                  bottom: 20
                }}
              >
                1300kt
              </div>
            </Panel>
          </div>
        </Col>
      </Row>
      <div style={{ paddingTop: 20 }}>
        <Row
          gutter={30}
          style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
          <div
            style={{
              height: '100%',
              width: '80%',
              backgroundColor: 'white',
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10
            }}
          >
            <MapContainer
              center={[36.8065, 10.1815]}
              zoom={13}
              style={{
                height: '50vh'
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
