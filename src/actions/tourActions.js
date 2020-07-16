import {
    TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS, TOUR_LIST_FAIL,
    TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
    TOUR_BOOKED_REQUEST, TOUR_BOOKED_SUCCESS, TOUR_BOOKED_FAIL,
    TOUR_TOP3_REQUEST, TOUR_TOP3_SUCCESS, TOUR_TOP3_FAIL,
  } from "../constants/tourConstants";
import { HOME_URL } from '../constants/configConstants';
import axios from 'axios';

const listTours = (category = '', search = '', sort = '', duration = '') => async (dispatch) => {
    try {
      dispatch({ type: TOUR_LIST_REQUEST });
      const res = await axios.get(`${HOME_URL}/api/v1/tours/client?category=` + category +
        "&search=" + search + "&sort=" + sort + "&duration=" + duration);
      // console.log(res.data.data.data);
      dispatch({ type: TOUR_LIST_SUCCESS, payload: res.data.data.data });
    }
    catch (error) {
      dispatch({ type: TOUR_LIST_FAIL, payload: error.message });
    }
}

const detailTour = (slug) => async (dispatch) => {
  try {
    dispatch({ type: TOUR_DETAILS_REQUEST, payload: slug });
    const res = await axios.get(`${HOME_URL}/api/v1/tours/` + slug);
    
    dispatch({ type: TOUR_DETAILS_SUCCESS, payload: 
      { 
        tour: res.data.data.data, images: res.data.data.data.images,
        reviews: res.data.data.data.reviews, guides: res.data.data.data.guides,
        locations: res.data.data.data.locations, date: res.data.data.data.startDates[0] 
      }});
  } catch (error) {
    dispatch({ type: TOUR_DETAILS_FAIL, payload: error.message });

  }
}

const tourBooked = (slug) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: TOUR_BOOKED_REQUEST, payload: slug });
  try {
    const res = await axios.get(`${HOME_URL}/api/v1/tours/tour-booked/` + slug, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    // console.log(res.data.data.booking);
    dispatch({ type: TOUR_BOOKED_SUCCESS, payload: res.data.data.booking });
  } catch (error) {
    dispatch({ type: TOUR_BOOKED_FAIL, payload: error.message });
  }
}

const top3Tours = () => async (dispatch) => {
  try {
    dispatch({ type: TOUR_TOP3_REQUEST });
    const res = await axios.get(`${HOME_URL}/api/v1/tours/top-3-cheap`);
    // console.log(res.data.data.data);
    dispatch({ type: TOUR_TOP3_SUCCESS, payload: res.data.data.data, length : res.data.results });
  }
  catch (error) {
    dispatch({ type: TOUR_TOP3_FAIL, payload: error.message });
  }
}

export { listTours, detailTour, tourBooked, top3Tours }