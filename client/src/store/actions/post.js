import * as actionTypes from './actionTypes';
import axiosUtil from '../../util/axios-util';

const addPostStart = () => {
  return {
    type: actionTypes.ADD_POST_START,
  };
};

const addPostSuccess = post => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post: post,
  };
};

const addPostFail = error => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    error: error,
  };
};

export const addPost = (postData, token) => {
  return dispatch => {
    console.log(token);
    dispatch(addPostStart);
    axiosUtil
      .post('post/post', postData, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(response => {
        console.log(response);
        // dispatch(addPostSuccess(post))
      })
      .catch(error => {
        // dispatch(addPostFail(error))
        console.log(error);
      });
  };
};
