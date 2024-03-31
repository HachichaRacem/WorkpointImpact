import React from 'react';
import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  Stack,
} from 'rsuite';

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Add a New Vehicle</Drawer.Title>
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
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Brand</Form.ControlLabel>
              <Form.Control name="firstname" style={{ width: 200 }} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Model</Form.ControlLabel>
              <Form.Control name="lastname" style={{ width: 200 }} />
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Matricule</Form.ControlLabel>
            <Form.Control name="email"  />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Circulation Date</Form.ControlLabel>
            <Form.Control name="circulationDate"  />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Fuel Type</Form.ControlLabel>
            <Form.Control name="city" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Horsepower</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Fuel Consommation 'L/KM'</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>

        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
