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
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
    status: user.status,
    posts,
  };
};

const fetchProfileFail = error => ({
  type: actionTypes.FETCH_PROFILE_FAIL,
  error,
});

export const fetchProfile = token => dispatch => {
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

const saveProfileStart = () => {
  return {
    type: actionTypes.SAVE_PROFILE_START,
  };
};

const saveProfileSuccess = (photoUrl, status) => {
  return {
    type: actionTypes.SAVE_PROFILE_SUCCESS,
    status,
    photoUrl,
  };
};

const saveProfileFail = error => {
  return {
    type: actionTypes.SAVE_PROFFILE_FAIL,
    error,
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const saveProfile = (profileData, token) => {
  return dispatch => {
    dispatch(saveProfileStart());
    const formData = new FormData();
    formData.append('status', profileData.status);
    formData.append('profileUrl', profileData.photo);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosUtil
      .put('user/profile', formData, config)
      .then(response => {
        const { photoUrl, status } = response.data.user;
        dispatch(saveProfileSuccess(photoUrl, status));
        // toast.success(response.data.message);
      })
      .catch(error => {
        console.log(error);
        const msg = error.response.message || 'Invalid input!';
        dispatch(saveProfileFail(msg));
      });
  };
};

export const statusChangeHandler = value => {
  return {
    type: actionTypes.STATUS_CHANGE_HANDLER,
    status: value,
  };
};

export const profileReset = () => {
  return {
    type: actionTypes.PROFILE_RESET,
  };
};
