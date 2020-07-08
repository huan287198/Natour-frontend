/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_vcp7StEKXgUa66V4AokjXgxz00TpZwqb0a');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('jwt');
      config.headers.Authorization =  `Bearer ${token}`;
      return config;
    }, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });
  
    const session = await axios(`http://localhost:5000/api/v1/bookings/checkout-session/${tourId}`);
     console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
