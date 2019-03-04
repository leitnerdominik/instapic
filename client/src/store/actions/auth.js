import * as actionTypes from './actionTypes';
import axiosUtil from '../../util/axios-util';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authLoginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

const authSignupSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
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

export const authLogin = authData => {
  return dispatch => {
    dispatch(authStart());
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
        console.log(err);
        let error = 'General Failure!';
        if (err.response) {
          error = err.response.data.message;
        }
        dispatch(authFailed(error));
      });
  };
};

export const authSignUp = authData => {
  return dispatch => {
    dispatch(authStart());
    axiosUtil
      .put('auth/signup', authData)
      .then(response => {
        if (response.status === 201) {
          dispatch(authSignupSuccess());
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
        dispatch(authFailed(error));
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
        dispatch(authLoginSuccess(token, userId));
        dispatch(autoLogout(expirationDate.getTime() - new Date().getTime()));
      }
    }
  };
};
