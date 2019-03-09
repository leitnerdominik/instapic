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
    dispatch(addPostStart());

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('imgUrl', postData.imgUrl);
    formData.append('description', postData.description);
    axiosUtil
      .post('post/post', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(response => {
        console.log(response);
        // dispatch(addPostSuccess());
      })
      .catch(error => {
        const errorText = error.response.data.message;
        dispatch(addPostFail(errorText));
      });
  };
};
