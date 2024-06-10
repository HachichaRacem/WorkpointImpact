import { API_URL } from '../constants.js';
import api from './api';

export const getDestination = () => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  //console.log("token",token);
  return api
    .get(`${API_URL}/destinations`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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



export const updateDestination = (destinationId, updatedData) => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
    return api
      .put(`${API_URL}/destinations/update/${destinationId}`,updatedData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        return getDestination();
      })
      .catch(error => {
        const errorMsg = error.message;
        throw new Error(errorMsg);
      });
  };

  export const addDestination = (newDestinationData) => {
    const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
    return api
      .post(`${API_URL}/destinations`,newDestinationData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        return getDestination(); 
      })
      .catch(error => {
        const errorMsg = error.message;
        throw new Error(errorMsg);
      });
  };