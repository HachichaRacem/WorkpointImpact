import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  Button,
  DatePicker,
  Panel,
  SelectPicker,
  Table,
  Message,
  useToaster,
} from "rsuite";
import RoutineMachine from "./RoutineMachine";
import L from "leaflet";
import { format } from "date-fns";

const { Column, HeaderCell, Cell } = Table;

const Map = () => {
  const toaster = useToaster();

  const [] = useState([]);
  const [points, setPoints] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [selectedMember, setSelectedMembe] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [destinations, setDestinations] = useState([]);
  const loadUsersData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/destinations`,
        options
      );
      const response1 = await fetch("http://localhost:3000/members", options);
      const responseData = await response.json();
      const responseData1 = await response1.json();

      const response2 = await fetch(
        `http://localhost:3000/schedule/${selectedMember}`
      );
      const responseData2 = await response2.json();
      console.log("responseData2 : ", responseData2);
      const destinations = responseData2.map((item) => item.Destination);
      setDestinations(destinations);

      const fullName = responseData1.map((item) => item.fullName);
      console.log("responseData1", responseData1);
      console.log("FullNames", fullName);

      //points
      console.log("responseData", responseData);
      const result: any = [];
      responseData.map((point) => {
        result.push(L.latLng(point.longitude, point.latitude));
      });

      console.log("result", result);
      //setPoints(result);
      setFullNames(fullName);
      console.log("point", points);
      // const longitude = responseData.map(item => item.longitude);
      // console.log(longitude);

      // const latitude = responseData.map(item => item.latitude);
      // console.log(latitude);
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };

  const loadSchedule = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      if (selectedMember && selectedDate) {
        const response2 = await fetch(
          `http://localhost:3000/schedule/${selectedMember}/${format(
            selectedDate,
            "yyyy-MM-dd"
          )}`
        );
        const responseData = await response2.json();
        const result: any = [];
        responseData.map((point) => {
          result.push(L.latLng(point.longitude, point.latitude));
        });
        setPoints(result);
      } else {
        toaster.push(
          <Message closable showIcon type="error" duration={7000}>
            User and date are required !
          </Message>,
          {
            placement: "topCenter",
          }
        );
      }

      

      
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };
  console.log('points',points)

  /*
  //destination
  const fetchDestinations = async () => {
    try {
      const response = await fetch(`http://localhost:3000/schedule?user=${selectedMember}`);
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

  /*function handleSelect(event){
    setValue(event?.target.value);
    console.log("value",value);
  }*/

  const date = [
    {
      id: 1,
      name: "Hopital Borguiba",
      duration: "13 min",
      destination: "8.0 Km",
      carburant_impact: "23,361",
      date: "AM",
    },
    {
      id: 2,
      name: "Hopital Razi",
      duration: "Renault Clio",
      carburant_impact: "23,385",
      date: "AM",
    },
    {
      id: 3,
      name: "Cabinet Ghrab",
      duration: "Renault Clio",
      carburant_impact: "41,256",
      date: "AM",
    },
    {
      id: 4,
      name: "Pharmacie DMK",
      duration: "Renault Clio",
      carburant_impact: "10,038",
      date: "PM",
    },
    {
      id: 5,
      name: "Centre Allouche",
      duration: "Renault Clio",
      carburant_impact: "1,000",
      date: "PM",
    },
    {
      id: 6,
      name: "Vetérinaire Choura",
      duration: "Renault Clio",
      carburant_impact: "4,786",
      date: "PM",
    },
  ];
  return (
    <Panel>
      <div
        style={{ display: "flex", justifyContent: "left", paddingBottom: 20 }}
      >
        <DatePicker
          format="MMM dd, yyyy"
          size="md"
          style={{ width: 200 }}
          placeholder="Select date"
          value={selectedDate || undefined} // Set the value of the DatePicker
          onChange={(date) => setSelectedDate(date)} // Update selected date on change
        />

        <SelectPicker
          placeholder="Select member"
          size="md"
          data={fullNames.map((name) => ({ label: name, value: name }))}
          style={{ width: 180, paddingLeft: 20 }}
          onChange={(value) => setSelectedMembe(value)} // Update selected member on change
        />

        <Button appearance="primary" onClick={loadSchedule}>
          Get Destinations
        </Button>

        <div style={{ textAlign: "center", paddingLeft: 20, paddingRight: 20 }}>
          <Button appearance="primary">Get Report</Button>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid lightgray",
              padding: "8px",
              marginLeft: "20px",
              borderRadius: "5px",
              marginBottom: 10,
              display: "inline-block",
            }}
          >
            <div style={{ fontSize: "15px" }}>
              <span style={{ color: "blue" }}>Carbon Impact : </span>1300.50
            </div>
          </div>
          <Button appearance="primary" style={{ marginLeft: 20 }}>
            Optimize
          </Button>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginLeft: 20,
          paddingLeft: "20",
          paddingRight: "20",
        }}
      ></div>
      <>
        <MapContainer center={[36.8065, 10.1815]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.length > 0 && <RoutineMachine points={points} />}

          {/* <RoutineMachine longitude = {longitude} /> */}
        </MapContainer>
        <Panel className="card" header="Destinations by Delegate and Date ">
          <Table height={300} data={date} rowKey="id">
            <Column width={200}>
              <HeaderCell>Start Point </HeaderCell>
              <Cell>
                {(rowData) => {
                  return <p>{rowData.name}</p>;
                }}
              </Cell>
            </Column>

            <Column width={200}>
              <HeaderCell>End Point </HeaderCell>
              <Cell>
                {(rowData) => {
                  return <p>{rowData.name}</p>;
                }}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={80}>
              <HeaderCell>Distence</HeaderCell>
              <Cell>
                {(rowData) => {
                  return <p>{rowData.destination}</p>;
                }}
              </Cell>
            </Column>

            <Column flexGrow={1} minWidth={80}>
              <HeaderCell>Duration</HeaderCell>
              <Cell>
                {(rowData) => {
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