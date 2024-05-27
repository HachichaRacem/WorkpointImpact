import React, { useState, useRef } from 'react';
import { Affix, Stack, DateRangePicker, IconButton, SelectPicker, DatePicker, Button, toaster, Message } from 'rsuite';
import { format } from 'date-fns';
import SettingIcon from '@rsuite/icons/Setting';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';

import type { RangeType } from 'rsuite/DateRangePicker';
import { downloadPDF } from '@/services/corbon.service';
import { MdTry } from 'react-icons/md';

interface Range extends RangeType {
  appearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
}

const PageToolbar = () => {
  const [fixed, setFixed] = useState<boolean | undefined>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDownloadPDF = async () => {
    try {
      
    
    if (selectedDate) {
    const response = await downloadPDF(format(selectedDate, 'yyyy-MM-dd'));
    if(response.status ===404){
      toaster.push(
        <Message closable showIcon type="success" duration={9000}>
          No emissions found for the given date
        </Message>,
        {
          placement: 'topCenter',
        }
      );


    }
    
  }
} catch (error) {
      
}};
  return (
    
    

      <Stack
        spacing={10}
        justifyContent="space-between"
        ref={containerRef}
        style={{
          position: 'relative',
          background: '#fff',
          marginBottom: 20,
          padding: 4,
          borderRadius: fixed ? 0 : 6,
          boxShadow: fixed ? '0 0 15px 0 rgb(0 0 0 / 10%)' : undefined
        }}
      >
        <Stack spacing={10}>
          <DatePicker
            format="dd-MM-yyyy"
            size="md"
            style={{ width: 200 }}
            placeholder="Select date"
            value={selectedDate || undefined} 
            onChange={date => setSelectedDate(date)} 
          />
          <div>
                  <Button appearance="primary" style={{ backgroundColor: '#3498ff', borderColor: '#87CEEB',marginLeft:'20px' }}onClick={handleDownloadPDF}>
                   Download PDF
                  </Button>
                </div>
        </Stack>
 
      </Stack>
    
  );
};

export default PageToolbar;
