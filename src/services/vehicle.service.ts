import { API_URL } from '../constants.js';
import api from './api';

export const getVehicule = () => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  console.log("token",token);
  console.log('hello')
  return api
    .get(`${API_URL}/transports`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .put(`${API_URL}/transports/update/${vehiculeId}`,updatedData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .post(`${API_URL}/transports`,newVehiculeData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
