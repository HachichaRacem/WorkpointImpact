import { ArrowLeftLine, ArrowRightLine, FileUpload } from '@rsuite/icons';
import React from 'react';
import { useState } from 'react';
import { Button, IconButton, Message, SelectPicker, useToaster } from 'rsuite';
import {uploadScheduleData} from '@/services/schedule.service'

const CalendarHeader = ({ refs, users, setUser, user, setLoading }) => {
  const toaster = useToaster();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemeber',
    'December'
  ];
  const [title, setTitle] = useState(
    months[new Date().getMonth()] + ' ' + new Date().getFullYear()
  );

  const nextHandle = () => {
    refs.current.getApi().next();
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const prevHandle = () => {
    refs.current.getApi().prev();
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const monthHandle = () => {
    refs.current.getApi().changeView('dayGridMonth');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const weekHandle = () => {
    refs.current.getApi().changeView('timeGridWeek');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };
  const dayHandle = () => {
    refs.current.getApi().changeView('timeGridDay');
    setTitle(refs.current.getApi().currentDataManager.data.viewTitle);
  };

  
  const handleFileUpload = async (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    // try {
    //   const response = await fetch('http://51.210.242.227:5200/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     console.log('File uploaded successfully');
    //     // Do something if upload is successful
    //   } else {
    //     console.error('Error uploading file');
    //     // Handle error if upload fails
    //   }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   // Handle network error
    // }
    try{
      const response = await uploadScheduleData(file);
      console.log("response",response)
      if(response.ok){
        console.log('File uploaded successfully');
      }else{
        console.error('Error uploading file');
      }
    }catch(e:any) {
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

  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SelectPicker
        placeholder="Select member"
        size="md"
        data={users}
        style={{ width: 220, paddingTop: 3, marginBottom: 30 }}
        onChange={value => {
          setUser(value);
          setLoading(true);
        }}
        value={user}
      />
      <div style={{textAlign:'right',paddingTop: 3, marginBottom: 30}}>
       <label htmlFor="uploadInput" style={{
        color: 'white',
        backgroundColor: '#3498ff', 
        padding: '9px 10px',
        borderRadius: '5px',
        cursor: 'pointer' ,
      }
        }>Upload File
        <input 
    type="file" 
    id="uploadInput" 
    name="uploadInput"
    onChange={handleFileUpload}
    style={{ display: 'none' }}
  />
        </label>
      </div>
      </div>
       
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 20,
          paddingTop: 5
        }}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <IconButton icon={<ArrowLeftLine />} onClick={() => prevHandle()} size="lg" />
            <IconButton icon={<ArrowRightLine />} onClick={() => nextHandle()} size="lg" />
          </div>
        </div>
        <h3 style={{ textAlign: 'center', paddingRight: 100 }} id="title">
          {title}
        </h3>
        <div>
          <Button onClick={() => monthHandle()}>Month</Button>
          <Button onClick={() => weekHandle()}>Week</Button>
          <Button onClick={() => dayHandle()}>Day</Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
