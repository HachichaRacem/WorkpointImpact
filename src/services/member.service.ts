import { API_URL } from '../constants.js';
import api from './api';

export const getMembers = () => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  console.log("token",token);

  return api
    .get(`${API_URL}/members`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.data)
    .catch(error => {
      const errorMsg = error.response.data;
      throw Error(errorMsg.message);
    });
};


export const updateMember = (memberId,updatedData ) => {
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .put(`${API_URL}/members/update/${memberId}`,updatedData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
  const memberString = localStorage.getItem('member');
  if (!memberString) {
    throw new Error('No member found in localStorage');
  }

  const member = JSON.parse(memberString);
  const token = member.token;
  return api
    .post(`${API_URL}/members`,newMemberData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
