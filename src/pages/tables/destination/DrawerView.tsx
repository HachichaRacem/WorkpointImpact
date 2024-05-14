import React, { useState } from 'react';
import { Drawer, Button, Form, useToaster, Message } from 'rsuite';
import{addDestination,updateDestination} from '@/services/destination.service'

const DrawerView = ({ 
  setShowDrawer, 
  isOpen,
  formValue,
  setFormValue,
  isUpdateForm,
  loadDestinationData 

}) => {
  const toaster = useToaster();

  const handleConfirmClick = async () => {
    if(isUpdateForm){
      try{
        const response = await updateDestination(formValue['_id'],formValue);
        
          await loadDestinationData();
          setShowDrawer(false);
        
      } catch(e:any) {
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
    }else{
      try{
        const response = await addDestination(formValue)
        
          await loadDestinationData();
          setShowDrawer(false);
        
      }catch (e:any) {
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


    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify(formValue)
    // };
    // try {
    //   const response = await fetch('http://51.210.242.227:5200/destinations', options);
    //   if (response.ok) {
    //     setShowDrawer(false);
    //   } else {
    //     console.log(JSON.stringify(await response.json()));
    //   }
    // } catch (e) {
    //   console.log('ERROR: ' + e);
    // }
    setFormValue({});
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
      <Form onChange={setFormValue} fluid formValue={formValue}>
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
