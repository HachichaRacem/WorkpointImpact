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

  export const uploadScheduleData = (file) =>{
    return api
      .post(`${API_URL}/schedule/upload`,file)
      .then(response =>{
        console.log('Upload successful:', response);
      })
      .catch(error => {
        const errorMsg = error.message;
        return errorMsg;
      });
  };

