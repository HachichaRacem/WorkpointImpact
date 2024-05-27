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
  export const downloadPDF = async (date) => {
    try {
      const response = await api.get(`/carbonemissions/download-pdf/${date}`, {
        responseType: 'blob', // Ensure the response type is set to blob for binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'carbon_emission_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };