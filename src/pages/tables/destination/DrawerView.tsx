import React from 'react';
import { Drawer, DrawerProps, Button, Form } from 'rsuite';

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Add a New Destination</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClose} appearance="primary">
            Confirm
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid>
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
            <Form.Control name="street" />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
