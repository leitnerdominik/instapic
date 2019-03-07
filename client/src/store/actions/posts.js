import * as actionTypes from './actionTypes';
import axiosUtil from '../../util/axios-util';

const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START,
  };
};

const fetchPostsSuccess = posts => {
  console.log(posts);
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts,
  };
};

const fetchPostsFail = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error,
  };
};

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart);
    axiosUtil
      .get('post/posts')
      .then(response => {
        console.log(response);
        const posts = response.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchPostsFail(err));
      });
  };
};