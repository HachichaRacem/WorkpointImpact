import { API_URL } from '../constants.js';
import api from './api';

export const getProfile = () => {
    return api
      .get(`${API_URL}/profiles`)
      .then(response => {
        const data = response.data;
        return data;
      })
      .catch(error => {
        console.log('message',error.response.data)
        const errorMsg = error.response.data;
        console.log('error',errorMsg)
        throw Error(errorMsg.message)
      });
  };