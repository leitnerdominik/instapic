import { toast } from 'react-toastify';

import * as actionTypes from './actionTypes';
import axiosUtil from '../../util/axios-util';

import * as actions from './index';

const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};

const authLoginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    idToken: token,
    userId,
  };
};
const authLoginFailed = error => {
  return {
    type: actionTypes.AUTH_LOGIN_FAILED,
    error,
  };
};

const authSignUpStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START,
  };
};

const authSignupSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
  };
};

const authSignUpFailed = error => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAILED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiryDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const autoLogout = remainingTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      dispatch(actions.userLogout());
    }, remainingTime);
  };
};

export const authLogin = authData => {
  return dispatch => {
    dispatch(authLoginStart());
    axiosUtil
      .post('auth/login', authData)
      .then(response => {
        console.log('SUCCESS: ', response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        const remainingMs = 60 * 60 * 1000; // 1h
        const expiryDate = new Date(new Date().getTime() + remainingMs);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(authLoginSuccess(response.data.token, response.data.userId));
        dispatch(autoLogout(remainingMs));
      })
      .catch(err => {
        let error = 'General Failure!';
        if (err.response) {
          error = err.response.data.message;
        } else if (err.message) {
          error = err.message;
        }
        dispatch(authLoginFailed(error));
        toast.error(error);
      });
  };
};

export const authSignUp = authData => {
  return dispatch => {
    dispatch(authSignUpStart());
    axiosUtil
      .put('auth/signup', authData)
      .then(response => {
        if (response.status === 201) {
          dispatch(authSignupSuccess());
          toast.success('User Created!');
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err);
        let error = 'General Failure!';
        if (err.response.data.message) {
          error = err.response.data.message;
          console.log(error);
        }
        dispatch(authSignUpFailed(error));
        toast.error(error);
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      dispatch(actions.userLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expiryDate'));
      if (new Date() >= expirationDate) {
        dispatch(logout());
        dispatch(actions.userLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authLoginSuccess(token, userId));
        dispatch(autoLogout(expirationDate.getTime() - new Date().getTime()));
      }
    }
  };
};
