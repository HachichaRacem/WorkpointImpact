import { API_URL } from '../constants.js';
import api from './api';

export const getDestination = () => {
  return api
    .get(`${API_URL}/destinations`)
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
    return api
      .patch(`${API_URL}/destinations/${destinationId}/${updatedData}`)
      .then(() => {
        return getDestination();
      })
      .catch(error => {
        const errorMsg = error.message;
        throw new Error(errorMsg);
      });
  };

  export const addDestination = (newDestinationData) => {
    return api
      .post(`${API_URL}/destinations/${newDestinationData}`)
      .then(() => {
        return getDestination();
      })
      .catch(error => {
        const errorMsg = error.message;
        throw new Error(errorMsg);
      });
  };