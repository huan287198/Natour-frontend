import axios from 'axios';
import { showAlert } from './alerts';

export const createTour = async (data) => {
    try {
        const url = 'http://localhost:3000/api/v1/tours';
        const res = await axios({
          method: 'POST',
          url,
          data
        });
    
        if (res.data.status === 'success') {
          showAlert('success', `Created successfully!`);
          return res.data.status;
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
      }
};

export const updateTour = async (data, id) => {
  try {
      const url = `http://localhost:3000/api/v1/tours/${id}`;
      const res = await axios({
        method: 'PATCH',
        url,
        data
      });
  
      if (res.data.status === 'success') {
        showAlert('success', `Updated successfully!`);
        return res.data.status;
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
};

export const deleteTour = async (id) => {
  try {
    const url =`http://localhost:3000/api/v1/tours/${id}`;

    const res = await axios({
      method: 'DELETE',
      url
    });

    if (res.data.status === 'success') {
      showAlert('success',  `Delete successfully!`);
      return res.data.status;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const tourBooked = async (id) => {
  try {
    const url =`http://localhost:5000/api/v1/tours/tour-booked/${id}`;
    const res = await axios({
      method: 'GET',
      url
    });

    if (res.data.status === 'success') {
      return res.data.data.booking;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};