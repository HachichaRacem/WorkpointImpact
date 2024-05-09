import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
import {
  Button,
  DatePicker,
  Panel,
  SelectPicker,
  Table,
  Message,
  useToaster,
  IconButton,
  Stack,
  Affix,
  Form,
  Loader
} from 'rsuite';
import RoutineMachine from './RoutineMachine';
import L from 'leaflet';
import { format } from 'date-fns';
import { FaCar, FaSearch } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { GoStopwatch } from 'react-icons/go';
import './style.css';
import { MdAccessTimeFilled } from 'react-icons/md';
import { RiCarLine } from 'react-icons/ri';
import { LuFuel } from 'react-icons/lu';
import { CiCalendarDate } from 'react-icons/ci';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { TbBrandCarbon } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineCalculator } from 'react-icons/ai';
import { getMembers } from '@/services/member.service';
import { getScheduleByUserDate } from '@/services/schedule.service';
import MapComponent from './MapComponent';

const Map = () => {
  const toaster = useToaster();

  const [] = useState([]);
  const [points, setPoints] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false); // Nouvel état pour gérer l'affichage
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [car, setCar] = useState(null);
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const formulas = [{ label: 'Carbon Emission (Distance / Consumption)', value: 'carbonImpact' }];

  const loadUsersData = async () => {
    try {
      const usersResult = await getMembers();

      const fullName = usersResult.map(item => {return {
        ...item,
        label:item.fullName,
        value:item._id
      }});

      setUsers(fullName);
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  const loadSchedule = async () => {
    try {
      if (selectedMember && selectedDate) {
        const responseData = await getScheduleByUserDate(
          selectedMember,
          format(selectedDate, 'yyyy-MM-dd')
        );


        console.log('🚀 ~ loadSchedule ~ sortedResult:', responseData);

        const result: any = [];
        responseData?.map(point => {
          result.push(L.latLng(point.destination.latitude, point.destination.longitude));
        });
        setPoints(result);
        setDestinations(responseData);
        setShowDetails(true);
        setCar(responseData[0].user.vehicle);
      } else {
        toaster.push(
          <Message closable showIcon type="error" duration={9000}>
            User and date are required !
          </Message>,
          {
            placement: 'topCenter'
          }
        );
      }
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  /*
  //destination
  const fetchDestinations = async () => {
    try {
      const response = await fetch(`http://51.210.242.227:5200/schedule?user=${selectedMember}`);
      const responseData = await response.json();
      const destinations = responseData.map(item => item.destination);
      setDestinations(destinations);
    } catch (error) {
      console.log('Error fetching destinations:', error);
    }
  };*/

  useEffect(() => {
    loadUsersData();
  }, []);

  useEffect(() => {
    setPoints([]);
    setDestinations([]);
    setShowDetails(false);
  }, [selectedDate,selectedMember]);

  const handleClosePanel = () => {
    setShowDetails(false);
  };

  const calculateResult = (distance, fuelConsumption) => {
    setLoading(true);
    if (selectedFormula === 'carbonImpact') {
      const result = (distance / 100) * fuelConsumption;
      setCalculationResult(parseFloat(result.toFixed(3)));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedFormula && distance && car?.fuelcons) {
      calculateResult(distance, car.fuelcons);
    }
  }, [selectedFormula, distance, car]);

  return (
    <Panel>
      {/* <Affix>
        <Stack
          spacing={20}
          // justifyContent="space-between"
          // ref={containerRef}
          style={{
            position: 'relative',
            background: '#fff',
            marginBottom: 20,
            padding: 4,
            borderRadius: 6,
            boxShadow: '0 0 15px 0 rgb(0 0 0 / 5%)'
          }}
        >
          <DatePicker
            appearance="subtle"
            format="dd-MM-yyyy"
            size="md"
            style={{ width: 200 }}
            placeholder="Select date"
            value={selectedDate || undefined} // Set the value of the DatePicker
            onChange={date => setSelectedDate(date)} // Update selected date on change
          />

          <SelectPicker
            appearance="subtle"
            placeholder="Select member"
            size="md"
            style={{ width: 200 }}
            data={fullNames.map(name => ({ label: name, value: name }))}
            onChange={value => setSelectedMember(value)} // Update selected member on change
          />

          <IconButton icon={<FaSearch />} appearance="primary" onClick={loadSchedule} />
        </Stack>

      </Affix> */}
      <Stack spacing={20} style={{ marginLeft: 20 }}>
        <DatePicker
          format="dd-MM-yyyy"
          size="md"
          style={{ width: 200 }}
          placeholder="Select date"
          value={selectedDate || undefined} // Set the value of the DatePicker
          onChange={date => setSelectedDate(date)} // Update selected date on change
        />

        <SelectPicker
          placeholder="Select member"
          size="md"
          data={users}
          onChange={value => setSelectedMember(value)} // Update selected member on change
          style={{ width: 200 }}
        />

        <IconButton icon={<FaSearch />} appearance="primary" onClick={loadSchedule} />
        {/* <Button appearance="primary" onClick={loadSchedule}>
          <FaSearch />
        </Button> */}
        {/* 
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
              <span style={{ color: 'blue' }}>Carbon Impact : </span>1300.50
            </div>
          </div>
          <Button appearance="primary" style={{ marginLeft: 20 }}>
            Optimize
          </Button>
        </div> */}
      </Stack>
      {/* <div
        style={{
          textAlign: 'center',
          marginLeft: 20,
          paddingLeft: '20',
          paddingRight: '20'
        }}
      ></div> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: 20,
          paddingLeft: '20',
          paddingRight: '20',
          marginTop: 20
        }}
      >
        {/* <MapContainer center={[36.8065, 10.1815]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.length > 0 && (
            <RoutineMachine points={points} setDuration={setDuration} setDistance={setDistance} />
          )}

        </MapContainer> */}

        <MapComponent
          destinations={destinations}
          points={points}
          setDuration={setDuration}
          setDistance={setDistance}
        />

        {/* {showDetails && ( */}
        <Panel
          // header="Details "
          style={{ marginLeft: '20px', width: showDetails ? '400px' : 0, marginTop: 0 }}
          className={`card ${showDetails ? 'slide-in' : 'slide-out'}`}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6 className="title">Details</h6>

            <IconButton
              color="red"
              icon={<IoMdClose />}
              appearance="link"
              onClick={handleClosePanel}
            />
          </div>

          {points.length == 0 && (
            <Message showIcon type="warning">
              No route found for this date
            </Message>
          )}
          <Stack
            justifyContent="flex-start"
            direction="row"
            alignItems="flex-start"
            spacing={40}
            wrap
            style={{ marginTop: 50 }}
          >
            <p title="Distance">
              <GiPathDistance size={18} /> {distance} km
            </p>
            <p title="Duration">
              {' '}
              <GoStopwatch /> {duration} min
            </p>
            <p title="Car">
              {' '}
              <RiCarLine /> {`${car?.brand} ${car?.model}`}
            </p>
            <p title="Fuel">
              <LuFuel /> {car?.fueltype}
            </p>
            <p title="Consumption">
              <IoSpeedometerOutline /> {car?.fuelcons} {' l/100km'}
            </p>
            <p title="Date of entry into circulation">
              <CiCalendarDate /> {car?.circulationDate?.toLocaleString()?.substring(0, 10)}
            </p>
            <Stack>
              <Form.Group controlId="password-7">
                <Form.ControlLabel>
                  <Stack spacing={2}>
                    <AiOutlineCalculator />
                    <p style={{ marginBottom: 3 }}>Carbon Impact Formulas</p>
                  </Stack>
                </Form.ControlLabel>
                <SelectPicker
                  data={formulas.map(formula => ({ label: formula.label, value: formula.value }))}
                  onChange={value => setSelectedFormula(value)}
                  placeholder="Select formula"
                  style={{ width: 224, marginTop: 5 }}
                />
              </Form.Group>
            </Stack>
            {loading && <Loader content="calculating..." vertical />}
            {calculationResult && (
              <p title="Carbon emission">
                <TbBrandCarbon /> {calculationResult} kg CO2eq
              </p>
            )}
          </Stack>
        </Panel>
        {/* )} */}
      </div>
    </Panel>
  );
};

export default Map;
