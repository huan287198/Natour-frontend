import {
    TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS, TOUR_LIST_FAIL,
    TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
    TOUR_BOOKED_REQUEST, TOUR_BOOKED_SUCCESS, TOUR_BOOKED_FAIL,
    TOUR_TOP5_REQUEST, TOUR_TOP5_SUCCESS, TOUR_TOP5_FAIL,
  } from "../constants/tourConstants"
import axios from 'axios';

const listTours = (difficulty = '', search = '', sort = '') => async (dispatch) => {
    try {
      dispatch({ type: TOUR_LIST_REQUEST });
      const res = await axios.get("http://localhost:5000/api/v1/tours/client?difficulty=" + difficulty +
        "&search=" + search + "&sort=" + sort);
      // console.log(res.data.data.data);
      dispatch({ type: TOUR_LIST_SUCCESS, payload: res.data.data.data });
    }
    catch (error) {
      dispatch({ type: TOUR_LIST_FAIL, payload: error.message });
    }
}

const detailTour = (tourId) => async (dispatch) => {
  try {
    dispatch({ type: TOUR_DETAILS_REQUEST, payload: tourId });
    const res = await axios.get("http://localhost:5000/api/v1/tours/" + tourId);
    
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

const tourBooked = (tourId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: TOUR_BOOKED_REQUEST, payload: tourId });
  try {
    const res = await axios.get("http://localhost:5000/api/v1/tours/tour-booked/" + tourId, {
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

const top5Tours = () => async (dispatch) => {
  try {
    dispatch({ type: TOUR_TOP5_REQUEST });
    const res = await axios.get("http://localhost:5000/api/v1/tours/top-5-cheap");
    // console.log(res.data.data.data);
    dispatch({ type: TOUR_TOP5_SUCCESS, payload: res.data.data.data, length : res.data.results });
  }
  catch (error) {
    dispatch({ type: TOUR_TOP5_FAIL, payload: error.message });
  }
}

export { listTours, detailTour, tourBooked, top5Tours }