import React from 'react';
import { Form, Button, Panel, Stack} from 'rsuite';
import Brand from '@/components/Brand';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <Brand style={{ marginBottom: 10 }} />

      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>

        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Username or email address</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>
              <span>Password</span>
              <a style={{ float: 'right' }}>Forgot password?</a>
            </Form.ControlLabel>
            <Form.Control name="name" type="password" />
          </Form.Group>
          <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
              <Button appearance="primary" onClick={()=> navigate('/')}>Sign in</Button>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default SignUp;