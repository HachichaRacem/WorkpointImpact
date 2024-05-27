import React, { useEffect, useState } from 'react';
import { Row, Col, Panel, Button, DatePicker } from 'rsuite';
import * as images from '../../images/charts';
import { MapContainer, TileLayer } from 'react-leaflet';
import ScatterIcon from '@rsuite/icons/Scatter';
import { getMembers } from '@/services/member.service';
import { getVehicule } from '@/services/vehicle.service';
import { getDestination } from '@/services/destination.service';
import { getAllCarbonEmission } from '@/services/corbon.service';
import { downloadPDF } from '@/services/corbon.service';

const Dashboard = () => {
  const [membersCount, setMembersCount] = useState<number>(0);
  const [destinationsCount, setDestinationsCount] = useState<number>(0);
  const [transportsCount, setTransportsCount] = useState<number>(0);
  const [totalCarbonEmissions, setTotalCarbonEmissions] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const loadData = async () => {
    try {
      const usersResult = await getMembers();
      setMembersCount(usersResult.length);

      const transportsResult = await getVehicule();
      setTransportsCount(transportsResult.length);

      const destinationResult = await getDestination();
      setDestinationsCount(destinationResult.length);

      const carbonEmissionsResult = await getAllCarbonEmission();
      const totalCarbon = carbonEmissionsResult.reduce((sum, emission) => sum + emission.carbonEmission, 0);
      setTotalCarbonEmissions(totalCarbon);
      
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("membersCount", membersCount);
  }, [membersCount]);

  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-red">
            <img className="chart-img" src={images.PVIcon} alt="Total Members" />
            <div className="title">Total Members</div>
            <div className="value">{membersCount}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-green">
            <img className="chart-img" src={images.VVICon} alt="Total Destination" />
            <div className="title">Total Destination</div>
            <div className="value">{destinationsCount}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-blue">
            <img className="chart-img" src={images.UVIcon} alt="Total Vehicles" />
            <div className="title">Total Vehicles</div>
            <div className="value">{transportsCount}</div>
          </Panel>
        </Col>
      </Row>

      <Row gutter={30} className="dashboard-header2">
        <Col xs={16} style={{ paddingTop: 30 }}>
          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              marginBottom: 20
            }}
          >
            <iframe
              style={{
                background: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                width: '100%',
                height: '480px'
              }}
              src="https://charts.mongodb.com/charts-project-0-ghfljrb/embed/charts?id=664d223b-62ad-40f6-8d00-7c58f82a4eba&maxDataAge=3600&theme=light&autoRefresh=true"
              title="MongoDB Chart"
            ></iframe>
          </div>
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
                  fontSize: 20
                }}
              >
                Total Carbon:
              </div>
              <div
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  position: 'absolute',
                  right: 70,
                  bottom: 20
                }}
              >
                {totalCarbonEmissions.toFixed(3)} kg CO2eq
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
          <Col xs={16} style={{ paddingTop: 30 }}>
          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              marginBottom: 20
            }}
          >
            <iframe
              style={{
                background: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                width: '100%',
                height: '480px'
              }}
              src="https://charts.mongodb.com/charts-project-0-ghfljrb/embed/charts?id=664d289e-596c-472e-82d0-37feb7e7109e&maxDataAge=3600&theme=light&autoRefresh=true"
              title="MongoDB Chart"
            ></iframe>
          </div>
        </Col>
         { /*<div
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
              style={{ height: '50vh' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>*/}
        </Row>
      </div>
    </>
  );
};
 
export default Dashboard;
