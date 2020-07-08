import axios from "axios";
import {
  MY_REVIEW_LIST_REQUEST, MY_REVIEW_LIST_SUCCESS, MY_REVIEW_LIST_FAIL,
  REVIEW_SAVE_REQUEST, REVIEW_SAVE_SUCCESS, REVIEW_SAVE_FAIL,
  REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL,
} from "../constants/reviewConstants";
import { showAlert } from '../functions/alerts';

const listMyReviews = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_REVIEW_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const res = await axios.get("http://localhost:5000/api/v1/users/my-reviews", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_REVIEW_LIST_SUCCESS, payload: res.data.data.data })
    } catch (error) {
      dispatch({ type: MY_REVIEW_LIST_FAIL, payload: error.message });
    }
}

const saveReview = (review, tourId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_SAVE_REQUEST, payload: review });
    const { userSignin: { userInfo } } = getState();
    if (!review._id) {
      const res = await axios.post(`http://localhost:5000/api/v1/tours/${tourId}/reviews`, 
      review, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: REVIEW_SAVE_SUCCESS, payload: res.data.status });
      showAlert('success', 'Review successfully!');
    } else {
      const res = await axios.patch('http://localhost:5000/api/v1/reviews/' + review._id, 
      review, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: REVIEW_SAVE_SUCCESS, payload: res.data });
      showAlert('success', 'Updated successfully!');
    }

  } catch (error) {
    dispatch({ type: REVIEW_SAVE_FAIL, payload: error.message });
    showAlert('error', error.response.data.message);
  }
}

const deleteReview = (reviewId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: REVIEW_DELETE_REQUEST, payload: reviewId });
    const res = await axios.delete("http://localhost:5000/api/v1/reviews/" + reviewId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: REVIEW_DELETE_SUCCESS, payload: res.data, success: true });
  } catch (error) {
    dispatch({ type: REVIEW_DELETE_FAIL, payload: error.message });

  }
}

export { listMyReviews, deleteReview, saveReview };