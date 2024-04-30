import { API_URL } from '../constants.js';
import api from './api';

export const getMembers = () => {
  return api
    .get(`${API_URL}/members`)
    .then(response => {
      const data = response.data;
      return data;
    })
    .catch(error => {
      const errorMsg = error.message;
      return errorMsg;
    });
};
