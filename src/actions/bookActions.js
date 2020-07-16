/* eslint-disable no-undef */
import axios from "axios";
import {
  MY_BOOK_LIST_REQUEST, MY_BOOK_LIST_SUCCESS, MY_BOOK_LIST_FAIL,
  BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL,
  BOOK_SAVE_REQUEST, BOOK_SAVE_SUCCESS, BOOK_SAVE_FAIL,
  BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
  BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL,
} from "../constants/bookConstants";
import { HOME_URL } from '../constants/configConstants';
import { showAlert } from '../functions/alerts';

const stripe = Stripe('pk_test_vcp7StEKXgUa66V4AokjXgxz00TpZwqb0a');

const listMyBooks = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_BOOK_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const res = await axios.get(`${HOME_URL}/api/v1/users/my-tours`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_BOOK_LIST_SUCCESS, payload: res.data.data.data, paid: res.data.paid })
    } catch (error) {
      dispatch({ type: MY_BOOK_LIST_FAIL, payload: error.message });
    }
}

const bookTour = (tourId, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_CREATE_REQUEST, payload: tourId });
    const { userSignin: { userInfo } } = getState();
    const session = await axios(`${HOME_URL}/api/v1/bookings/checkout-session/` + tourId + `/qty/` + qty, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
    dispatch({ type: BOOK_CREATE_SUCCESS, payload:session });
  } catch (error) {
    dispatch({ type: BOOK_CREATE_FAIL, payload: error.message });
  }
}

const createBooking = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_SAVE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const res = await axios.post(`${HOME_URL}/api/v1/bookings`,
    data, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    if (res.data.status === "success") {
      dispatch({ type: BOOK_SAVE_SUCCESS, payload:res.data });
      showAlert('success', 'Bạn đã đặt tour thành công. Vui lòng check email và chờ xác nhận.');
    }
  } catch (error) {
    dispatch({ type: BOOK_SAVE_FAIL, payload: error.message });
  }
}

const listBooks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const res = await axios.get(`${HOME_URL}/api/v1/bookings`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    // console.log(res.data.data.data);
    dispatch({ type: BOOK_LIST_SUCCESS, payload: res.data.data.data, length : res.data.results });
  }
  catch (error) {
    dispatch({ type: BOOK_LIST_FAIL, payload: error.message });
  }
}

const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: BOOK_DELETE_REQUEST, payload: bookId });
    const res = await axios.delete(`${HOME_URL}/api/v1/bookings/` + bookId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: BOOK_DELETE_SUCCESS, payload: res.data, success: true });
  } catch (error) {
    dispatch({ type: BOOK_DELETE_FAIL, payload: error.message });

  }
}

export { listMyBooks, bookTour, listBooks, deleteBook, createBooking };