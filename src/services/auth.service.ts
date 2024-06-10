import { API_URL } from '../constants.js';
import api from './api';

export const signIn = (email, password) => {
  return api
    .post(`${API_URL}/members/login`, { email, password })
    .then(response => {
      const member = response.data;
      localStorage.setItem('member', JSON.stringify(member)); 
      localStorage.setItem('token', member.token); // Optionally store token separately
      console.log("token",member.token)
      return member.token;
      
    })
    .catch(error => {
      const errorMsg = error.response.data;
      throw Error(errorMsg.message);
    });
};
