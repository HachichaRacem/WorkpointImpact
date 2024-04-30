import React, { useState } from 'react';
import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  Stack,
} from 'rsuite';

const DrawerView = ({ setShowDrawer, isOpen }) => {
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
      const response = await fetch('http://localhost:4000/transports', options);
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
    
    <Drawer backdrop="static" size="sm" placement="right" onClose={() => setShowDrawer(false)}
    open={isOpen}>
      <Drawer.Header>
        <Drawer.Title>Add a New Vehicle</Drawer.Title>
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
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Brand</Form.ControlLabel>
              <Form.Control name="brand" style={{ width: 200 }} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Model</Form.ControlLabel>
              <Form.Control name="model" style={{ width: 200 }} />
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Registration Number</Form.ControlLabel>
            <Form.Control name="matricule"  />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Fuel Type</Form.ControlLabel>
            <Form.Control name="fueltype" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Horsepower</Form.ControlLabel>
            <Form.Control name="horspowere" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Fuel Consumption 'L/KM'</Form.ControlLabel>
            <Form.Control name="fuelcons" />
          </Form.Group>

        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
function setShowDrawer(_arg0: boolean) {
  throw new Error('Function not implemented.');
}
