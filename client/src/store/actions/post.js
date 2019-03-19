import { toast } from 'react-toastify';

import axiosUtil from '../../util/axios-util';
import { fetchPosts } from './index';

import * as actionTypes from './actionTypes';

const loadAndReset = () => {
  return {
    type: actionTypes.LOAD_AND_RESET,
  };
};

const addPostSuccess = (post, creator) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post: post,
    creator: creator,
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
    dispatch(loadAndReset());
    axiosUtil
      .get(`post/${postId}`)
      .then(response => {
        const post = response.data.post;
        const creator = response.data.creator;
        dispatch(addPostSuccess(post, creator));
      })
      .catch(error => {
        toast.error(error);
      });
  };
};

export const addPost = (postData, token) => {
  return dispatch => {
    dispatch(loadAndReset());

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
        if (response.request.status === 201) {
          toast.success('Post created successfully!');
          dispatch(togglePostModal());
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

export const searchEditPost = (postId, posts) => {
  return {
    type: actionTypes.SEARCH_EDIT_POST,
    postId: postId,
    posts: posts,
  };
};

export const editPost = (postData, token) => {
  return dispatch => {
    dispatch(loadAndReset());
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('imgUrl', postData.imgUrl);
    formData.append('description', postData.description);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosUtil
      .put(`post/${postData._id}`, formData, config)
      .then(response => {
        console.log(response.request.status);
        if (response.request.status === 200) {
          toast.success('Post edited successfully!');
          dispatch(togglePostModal());
          dispatch(fetchPosts());
        }
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };
};

export const deletePost = (postId, token) => {
  return dispatch => {
    dispatch(loadAndReset());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosUtil
      .delete(`post/${postId}`, config)
      .then(response => {
        console.log(response);
        toast.success('Post deleted!');
        dispatch(fetchPosts());
      })
      .catch(error => {
        console.log(error);
      });
  };
};
