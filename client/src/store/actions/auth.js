import * as actionTypes from './actionTypes';
import axiosAuth from '../../util/axios-auth';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
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
    }, remainingTime);
  };
};

export const auth = (authData, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    axiosAuth
      .post('auth/login', authData)
      .then(response => {
        console.log('SUCCESS: ', response);
        const {
          data: { token, userId },
        } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        const remainingMs = 60 * 60 * 1000; // 1h
        const expiryDate = new Date(new Date().getTime() + remainingMs);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(authSuccess(token, userId));
        dispatch(autoLogout(remainingMs));
      })
      .catch(err => {
        console.log('FAILED: ', err.response);
        dispatch(authFailed(err.response.data.message));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expiryDate'));
      if (new Date() >= expirationDate) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(autoLogout(expirationDate.getTime() - new Date().getTime()))
      }
    }
  } 
};
