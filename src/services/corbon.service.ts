import { API_URL } from '../constants.js';
import api from './api';

export const getAllCarbonEmission = () => {
    return api
      .get(`${API_URL}/carbonemissions`)
      .then(response => {
        const data = response.data;
       // console.log("dataa",data);
        return data;
      })
      .catch(error => {
        console.log('message',error.response.data)
        const errorMsg = error.response.data;
        console.log('error',errorMsg)
        throw Error(errorMsg.message)
      });
  };