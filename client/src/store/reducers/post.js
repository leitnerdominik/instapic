import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  posts: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        loading: false,
        error: null,
      }
    case actionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;