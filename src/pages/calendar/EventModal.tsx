import React from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, Checkbox } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventModal = props => {
  const { onClose, open, onAddEvent, eventInfo, ...rest } = props;

  return (
    <Modal open={open} onClose={onClose} backdrop="static" {...rest}>
      <Modal.Header>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Form.Group controlId="name">
            <Form.ControlLabel>Destination</Form.ControlLabel>
            <Form.Control name="name" value={eventInfo?.title} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>Location</Form.ControlLabel>
            <Form.Control name="description" value={eventInfo?.address} />
          </Form.Group>

          <Form.Group controlId="start">
            <Form.ControlLabel>Date</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="Start Date"
                value={eventInfo?.start && new Date(eventInfo?.start)}
                readOnly
              />
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="End Date"
                value={eventInfo?.end && new Date(eventInfo?.end)}
                readOnly
              />

              {/* <Checkbox>All Day</Checkbox> */}
            </Stack>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>Car</Form.ControlLabel>
            <Form.Control
              name="description"
              value={`${eventInfo?.car?.brand} ${eventInfo?.car?.model}`}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={onAddEvent} appearance="primary">
          Submit
        </Button> */}
        <Button onClick={onClose} appearance="subtle">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
