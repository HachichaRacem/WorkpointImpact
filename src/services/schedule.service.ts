import { API_URL } from '../constants.js';
import api from './api';

export const getScheduleByUser = userId => {
  return api
    .get(`${API_URL}/schedule/${userId}`)
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
  return api
    .get(`${API_URL}/schedule/${userId}/${date}`)
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
