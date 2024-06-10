import { API_URL } from '../constants.js';
import api from './api';

export const getScheduleByUser = userId => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .get(`${API_URL}/schedule/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      return data;
    })
    .catch(error => {
      const errorMsg = error.message;
      return errorMsg;
    });
};

export const getScheduleByUserDate = (userId, date) => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .get(`${API_URL}/schedule/${userId}/${date}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      return data;
    })
    .catch(error => {
      const errorMsg = error.message;
      return errorMsg;
    });
};

export const uploadScheduleData = formData => {
  return api
    .post(`${API_URL}/schedule/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Upload successful:', response);
      return response.data;
    })
    .catch(error => {
      const errorMsg = error.message;
      return errorMsg;
    });
};

export const addScheduleData = data => {
  return api
    .post(`${API_URL}/schedule/add`, data)
    .then(response => {
      console.log('successful:', response);
    })
    .catch(error => {
      const errorMsg = error.message;
      return errorMsg;
    });
};
