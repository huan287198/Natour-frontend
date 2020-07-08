import axios from "axios";
import Cookie from 'js-cookie';
import { showAlert } from '../functions/alerts';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const register = (name, email, password, passwordConfirm) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, passwordConfirm } });
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/signup", { name, email, password, passwordConfirm });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      showAlert('success', 'Register successfully!');
      Cookie.set('userInfo', JSON.stringify(res.data));

    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/login", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
      showAlert('success', 'Logged in successfully!');
      Cookie.set('userInfo', JSON.stringify(res.data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT });
}

const update = (data) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: data });
  try {
    const res = await axios.patch("http://localhost:5000/api/v1/users/updateMe",
      data, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    if (res.data.status === 'success') {
      dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
      Cookie.set('userInfo', JSON.stringify(res.data));
      showAlert('success', 'Updated successfully!');
      window.location.href = '/profile';
    }
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const updatePassword = ({ passwordCurrent, password, passwordConfirm }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { passwordCurrent, password, passwordConfirm } });
  try {
    const res = await axios.patch("http://localhost:5000/api/v1/users/updateMyPassword",
    { passwordCurrent, password, passwordConfirm }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    if (res.data.status === 'success') {
      dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
      
    }
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}


export { signin, register, logout, update, updatePassword };