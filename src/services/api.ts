import axios from 'axios';
import { API_URL } from '../constants.js';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export default instance;
