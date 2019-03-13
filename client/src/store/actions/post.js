import { toast } from 'react-toastify';

import axiosUtil from '../../util/axios-util';
import { fetchPosts } from './index';

import * as actionTypes from './actionTypes';

const addPostStart = () => {
  return {
    type: actionTypes.ADD_POST_START,
  };
};

const addPostSuccess = (post, creator) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post: post,
    creator: creator
  };
};

const addPostFail = error => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    error: error,
  };
};

export const togglePostModal = () => {
  return {
    type: actionTypes.TOGGLE_POST_MODAL,
  };
};

export const getPost = postId => {
  return dispatch => {
    dispatch(addPostStart());
    axiosUtil
      .get(`post/${postId}`)
      .then(response => {
        console.log('data: ', response.data)
        console.log('post:', response.data.post);
        console.log('creator: ', response.data.creator)
        const post = response.data.post;
        const creator = response.data.creator;
        dispatch(addPostSuccess(post, creator));
      })
      .catch(error => {
        console.log(error);
        toast.error(error); 
      });
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
        if (response.request.status === 201) {
          dispatch(togglePostModal());
          toast.success('Post created successfully!');
          dispatch(fetchPosts());
        }
      })
      .catch(error => {
        const errorText = error.response.data.message;
        dispatch(addPostFail(errorText));
        toast.error(errorText);
      });
  };
};
