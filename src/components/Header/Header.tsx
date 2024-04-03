
import React, { useRef, useState } from 'react';
import {
  Dropdown,
  Popover,
  Whisper,
  WhisperInstance,
  Stack,
  Badge,
  Avatar,
  IconButton,
  List,
  Button
} from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import GearIcon from '@rsuite/icons/Gear';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import { FileUpload } from '@rsuite/icons';
import { useNavigate } from 'react-router-dom';

const renderAdminSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };

  const navigate = useNavigate();
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>Administrator</strong>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Profile & account</Dropdown.Item>
        <Dropdown.Item>Feedback</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item onClick={()=> navigate('sign-in')}>Sign out</Dropdown.Item>
        <Dropdown.Item
          icon={<HelpOutlineIcon />}
          href="https://rsuitejs.com"
          target="_blank"
          as="a"
        >
          Help{' '}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const renderSettingSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <strong>Settings</strong>
        </Dropdown.Item>
        <Dropdown.Item>Members</Dropdown.Item>
        <Dropdown.Item>Destination</Dropdown.Item>
        <Dropdown.Item>Means of transport</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Customize</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const renderNoticeSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const notifications = [
    [
      '7 hours ago',
      'The charts of the dashboard have been fully upgraded and are more visually pleasing.'
    ],
    [
      '13 hours ago',
      'The function of virtualizing large lists has been added, and the style of the list can be customized as required.'
    ],
    ['2 days ago', 'Upgraded React 18 and Webpack 5.'],
    [
      '3 days ago',
      'Upgraded React Suite 5 to support TypeScript, which is more concise and efficient.'
    ]
  ];

  return (
    <Popover ref={ref} className={className} style={{ left, top, width: 300 }} title="Last updates">
      <List>
        {notifications.map((item, index) => {
          const [time, content] = item;
          return (
            <List.Item key={index}>
              <Stack spacing={4}>
                <Badge /> <span style={{ color: '#57606a' }}>{time}</span>
              </Stack>

              <p>{content}</p>
            </List.Item>
          );
        })}
      </List>
    
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button onClick={onClose}>More notifications</Button>
      </div>
    </Popover>
  );
};

const Header = () => {
  const trigger = useRef<WhisperInstance>(null);
 
  const handleFileUpload = async (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully');
        // Do something if upload is successful
      } else {
        console.error('Error uploading file');
        // Handle error if upload fails
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle network error
    }
  };
  return (
    <Stack className="header" spacing={8}>
       <div style={{textAlign:'center', paddingBottom: 10}}>
       <label htmlFor="uploadInput" style={{ color: 'white', backgroundColor: '#3498ff', padding: '9px 10px', borderRadius: '5px', cursor: 'pointer' }}>Upload File
  <input 
    type="file" 
    id="uploadInput" 
    name="uploadInput"
    onChange={handleFileUpload}
    style={{ display: 'none' }}
  />
</label>
            </div>

      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderNoticeSpeaker}>
        <IconButton
          icon={
            <Badge content={5}>
              <NoticeIcon style={{ fontSize: 20 }} />
            </Badge>
          }
        />
      </Whisper>

      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderSettingSpeaker}>
        <IconButton icon={<GearIcon style={{ fontSize: 20 }} />} />
      </Whisper>

      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderAdminSpeaker}>
        <Avatar
          size="sm"
          circle
          src="https://avatars.githubusercontent.com/u/132157589?v=4"
          alt="@simonguo"
          style={{ marginLeft: 8 }}
        />
      </Whisper>
    </Stack>
  );
};

export default Header;
