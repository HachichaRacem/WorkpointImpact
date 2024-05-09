import { API_URL } from '../constants.js';
import api from './api';

export const getVehicule = () => {
  console.log('hello')
  return api
    .get(`${API_URL}/transports`)
    .then(response => {
      const data = response.data;
      console.log('data ',data);
      return data;
    })
    .catch(error => {
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
      //return errorMsg;
    });
};


export const updateVehicule = (vehiculeId, updatedData) => {
  return api
    .put(`${API_URL}/transports/update/${vehiculeId}`,updatedData)
    .then(() => {
      return getVehicule();
    })
    .catch(error => {
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
    });
};

export const addVehicule = (newVehiculeData) => {
  return api
    .post(`${API_URL}/transports`,newVehiculeData)
    .then(() => {
      return getVehicule();
    })
    .catch(error => {
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
    });
};
