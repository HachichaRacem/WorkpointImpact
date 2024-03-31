import React from 'react';
import { Row, Col, Panel } from 'rsuite';
import * as images from '../../images/charts';
import { MapContainer, TileLayer } from 'react-leaflet';
import DataTable from './DataTable';
import ScatterIcon from '@rsuite/icons/Scatter';

const Dashboard = () => {
  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-red">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Total Members</div>
            <div className="value">15</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-green">
            <img className="chart-img" src={images.VVICon} />
            <div className="title">Total Destination</div>
            <div className="value">280</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-blue">
            <img className="chart-img" src={images.UVIcon} />
            <div className="title">Total Vehicles </div>
            <div className="value">45</div>
          </Panel>
        </Col>
      </Row>

      

      <Row gutter={30} className="dashboard-header2">
        <Col xs={16}>
          <DataTable />
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
