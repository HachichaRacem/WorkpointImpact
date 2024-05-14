import React from 'react';
import { Drawer, Button, Form, SelectPicker, useToaster, Message } from 'rsuite';
import {updateMember,addMember} from '@/services/member.service'

const DrawerView = ({
  setShowDrawer,
  isOpen,
  formValue,
  setFormValue,
  isUpdateForm,
  loadUsersData,
  transportsData,
  profileData,
  usersData
}) => {
  const toaster = useToaster();

  const transportsList = transportsData.map(veh => {
    const vehName: string = veh['brand'] + veh['model'] + veh['matricule'];
    return {
      label: vehName,
      value: veh['_id']
    };
  });

  const profileList = profileData.map(prof => {
    const profName: String = prof['name'];
    return{
      label: profName,
      value: prof['_id']
    }
  });

  const handleConfirmClick = async () => {
    if (isUpdateForm) {
      // const options = {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body: JSON.stringify(formValue)

      // };
      try {
        console.log('hmhmhm',JSON.stringify(formValue))
        console.log('kkk',formValue['_id'])
        const response = await updateMember(formValue['_id'],formValue);
        
          console.log("ya weldi d5altchi")
          await loadUsersData();
          setShowDrawer(false);
      } catch (e:any) {
        console.log('e',e.message)
        toaster.push(
        <Message closable showIcon type="error" duration={9000}>
          {e.message}
        </Message>,
        {
          placement: 'topCenter'
        }
      );
      }
    } else {
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body: JSON.stringify(formValue)
      // };
      try {
        const response = await addMember(formValue);
        
          await loadUsersData();
          setShowDrawer(false);
        
      } catch (e:any) {
        console.log('e',e.message)
        toaster.push(
        <Message closable showIcon type="error" duration={9000}>
          {e.message}
        </Message>,
        {
          placement: 'topCenter'
        }
      );
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
                    formValue.vehicle?.model
                  : null
              }
              accepter={SelectPicker}
              data={transportsList}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>profile</Form.ControlLabel>
            <Form.Control name="profile" 
            value={
              formValue.profile
                ? formValue.profile?.name
                :null
            }
            accepter={SelectPicker}
            data={profileList}
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
