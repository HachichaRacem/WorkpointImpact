import React from 'react';
import { Drawer, Button, Form, SelectPicker } from 'rsuite';

const DrawerView = ({
  setShowDrawer,
  isOpen,
  formValue,
  setFormValue,
  isUpdateForm,
  loadUsersData,
  transportsData
}) => {
  const transportsList = transportsData.map(veh => {
    const vehName: string = veh['brand'] + veh['model'] + veh['matricule'];
    return {
      label: vehName,
      value: vehName
    };
  });
  const handleConfirmClick = async () => {
    if (isUpdateForm) {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formValue)
      };
      try {
        const response = await fetch('http://51.210.242.227:5200/members', options);
        if (response.ok) {
          await loadUsersData();
          setShowDrawer(false);
          console.log(JSON.stringify(await response.json()));
        } else {
          console.log(JSON.stringify(await response.json()));
        }
      } catch (e) {
        console.log('ERROR: ' + e);
      }
    } else {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formValue)
      };
      try {
        const response = await fetch('http://51.210.242.227:5200/members', options);
        if (response.ok) {
          await loadUsersData();
          setShowDrawer(false);
        } else {
          console.log(JSON.stringify(await response.json()));
        }
      } catch (e) {
        console.log('ERROR: ' + e);
      }
    }
    setFormValue({});
  };

  console.log('formValue', formValue);

  return (
    <Drawer
      backdrop="static"
      size="sm"
      placement="right"
      onClose={() => {
        setFormValue({});
        setShowDrawer(false);
      }}
      open={isOpen}
    >
      <Drawer.Header>
        <Drawer.Title>Add a New Member</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleConfirmClick} appearance="primary">
            Confirm
          </Button>
          <Button
            onClick={() => {
              setFormValue({});
              setShowDrawer(false);
            }}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form onChange={setFormValue} fluid formValue={formValue}>
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
            <Form.Control
              name="vehicle"
              value={
                formValue.vehicle
                  ? formValue.vehicle?.brand +
                    formValue.vehicle?.model +
                    formValue.vehicle?.matricule
                  : null
              }
              accepter={SelectPicker}
              data={transportsList}
            />
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
