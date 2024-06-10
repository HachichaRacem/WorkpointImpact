import React, { useState } from 'react';
import { Form, Button, Panel, Stack, Message } from 'rsuite';
import Brand from '@/components/Brand';
import { useNavigate } from 'react-router-dom';
import {signIn} from '@/services/auth.service';


const SignUp = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormChange = (value) => {
    setFormValue(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn(formValue.username, formValue.password); // Pass the credentials
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Form fluid onChange={handleFormChange}>
          <Form.Group>
            <Form.ControlLabel>Username or email address</Form.ControlLabel>
            <Form.Control name="username" value={formValue.username} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>
              <span>Password</span>
              <a style={{ float: 'right' }}>Forgot password?</a>
            </Form.ControlLabel>
            <Form.Control name="password" type="password" value={formValue.password} />
          </Form.Group>
          {error && (
            <Message showIcon type="error" description={error} />
          )}
          <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
              <Button appearance="primary" loading={loading} onClick={handleSubmit}>Sign in</Button>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default SignUp;