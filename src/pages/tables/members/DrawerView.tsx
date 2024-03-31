import React, { useEffect, useState } from 'react';
import { Drawer, Button, Form, SelectPicker } from 'rsuite';
const DrawerView = ({ setShowDrawer, isOpen }) => {
  const [transports, settransports] = useState([]);
  const [selectedtransport, setSelectedtransport] = useState(null);
  useEffect(() => {
 
  const fetchMembers = async () => {
    try {
      const respons = await fetch('http://localhost:4000/transports'); // Assuming your backend is running locally
      if (respons.ok) {
        const data = await respons.json();
        settransports(data.map(transport =>({label: transport.brand})));
             } else {
        console.error('Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  fetchMembers();
  },[])
  const handleMemberChange = (value) => {
    setSelectedtransport(value);
  };
  const [formValue, setFormValue] = useState<any>({});
  const handleConfirmClick = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formValue)
    };
    try {
      const response = await fetch('http://localhost:4000/members', options);
      if (response.ok) {
        setShowDrawer(false);
      } else {
        console.log(JSON.stringify(await response.json()));
      }
    } catch (e) {
      console.log('ERROR: ' + e);
    }
  };

  return (
    <Drawer
      backdrop="static"
      size="sm"
      placement="right"
      onClose={() => setShowDrawer(false)}
      open={isOpen}
    >
      <Drawer.Header>
        <Drawer.Title>Add a New Member</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleConfirmClick} appearance="primary">
            Confirm
          </Button>
          <Button onClick={() => setShowDrawer(false)} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form onChange={setFormValue} fluid>
          <Form.Group>
            <Form.ControlLabel>Full Name</Form.ControlLabel>
            <Form.Control name="fullName" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Address </Form.ControlLabel>
            <Form.Control name="address" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Postal Code</Form.ControlLabel>
            <Form.Control name="postalCode" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Assign Vehicle</Form.ControlLabel>
            <Form.Control name="vehicle" accepter={SelectPicker} data={transports} value={selectedtransport}  onChange={handleMemberChange}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Longitude Home</Form.ControlLabel>
            <Form.Control name="long" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Latitude Home </Form.ControlLabel>
            <Form.Control name="lat" />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
