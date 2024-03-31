import React, { useState } from 'react';
import { Drawer, Button, Form } from 'rsuite';

const DrawerView = ({ setShowDrawer, isOpen }) => {
  const [formValue,setFormValue] = useState<any>({});
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
      const response = await fetch('http://localhost:4000/destinations', options);
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
        <Drawer.Title>Add a New Destination</Drawer.Title>
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
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Phone Number</Form.ControlLabel>
            <Form.Control name="phoneNumber" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Type</Form.ControlLabel>
            <Form.Control name="type" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Addresse </Form.ControlLabel>
            <Form.Control name="address" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Postal Code</Form.ControlLabel>
            <Form.Control name="postalcode" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Zone</Form.ControlLabel>
            <Form.Control name="zone" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Longitude</Form.ControlLabel>
            <Form.Control name="longitude" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Latitude</Form.ControlLabel>
            <Form.Control name="latitude" />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
