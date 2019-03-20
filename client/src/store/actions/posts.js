import * as actionTypes from './actionTypes';
import axiosUtil from '../../util/axios-util';

const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START,
  };
};

const fetchPostsSuccess = posts => {
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
    dispatch(fetchPostsStart());
    axiosUtil
      .get('post/posts')
      .then(response => {
        const posts = response.data.map(post => ({
          ...post,
          imgUrl: post.imgUrl,
        }));
        dispatch(fetchPostsSuccess(posts));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchPostsFail(error));
      });
  };
};
