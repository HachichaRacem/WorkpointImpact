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
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
    });
};


export const updateMember = (memberId,updatedData ) => {
  return api
    .put(`${API_URL}/members/${memberId}/${updatedData}`)
    .then(() => {
      return getMembers();
    })
    .catch(error => {
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
    });
};

export const addMember = (newMemberData) => {
  return api
    .post(`${API_URL}/members/${newMemberData}`)
    .then(() => {
      return getMembers();
    })
    .catch(error => {
      console.log('message',error.response.data)
      const errorMsg = error.response.data;
      console.log('error',errorMsg)
      throw Error(errorMsg.message)
    });
};
