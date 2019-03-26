import * as actionTypes from '../actions/actionTypes';

const initialstate = {
  posts: null,
  user: null,
  error: null,
  loading: false,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.user,
        posts: action.posts,
      };
    case actionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SET_STATUS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SET_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
