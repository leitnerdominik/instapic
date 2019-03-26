import { toast } from 'react-toastify';

import * as actionTypes from './actionTypes';

import axiosUtil from '../../util/axios-util';

const fetchProfileStart = () => {
  return {
    type: actionTypes.FETCH_PROFILE_START,
  };
};

const fetchProfileSuccess = (user, posts) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    user: user,
    posts: posts,
  };
};

const fetchProfileFail = error => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: error,
  };
};

export const fetchProfile = token => {
  return dispatch => {
    dispatch(fetchProfileStart());
    axiosUtil
      .get('user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        dispatch(fetchProfileSuccess(response.data.user, response.data.posts));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchProfileFail(error.message));
      });
  };
};

const setStatusStart = () => {
  return {
    type: actionTypes.SET_STATUS_START,
  };
};

const setStatusSuccess = () => {
  return {
    type: actionTypes.SET_STATUS_SUCCESS,
  };
};

const setStatusFail = error => {
  return {
    type: actionTypes.SET_STATUS_FAIL,
    error: error,
  };
};

export const setStatus = (status, token) => {
  return dispatch => {
    dispatch(setStatusStart());
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    axiosUtil
      .put('user/status', status, config)
      .then(response => {
        dispatch(setStatusSuccess());
        toast.success(response.data.message);
      })
      .catch(error => {
        const msg = error.message;
        dispatch(setStatusFail(msg));
        console.log(msg);
        toast.error(msg);
      });
  };
};
