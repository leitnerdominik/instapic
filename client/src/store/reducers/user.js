import * as actionTypes from '../actions/actionTypes';

const initialstate = {
  posts: null,
  name: null,
  email: null,
  status: null,
  error: null,
  loadingProfile: false,
  loadingStatus: false,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_START:
      return {
        ...state,
        loadingProfile: true,
        error: null,
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        error: null,
        name: action.name,
        email: action.email,
        status: action.status,
        posts: action.posts,
      };
    case actionTypes.FETCH_PROFILE_FAIL:
      return {
        ...state,
        loadingProfile: false,
        error: action.error,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        posts: null,
        name: null,
        email: null,
        status: null,
        error: null,
        loadingProfile: false,
        loadingStatus: false,
      };
    case actionTypes.SET_STATUS_START:
      return {
        ...state,
        loadingStatus: true,
        error: null,
      };
    case actionTypes.SET_STATUS_SUCCESS:
      return {
        ...state,
        loadingStatus: false,
      };
    case actionTypes.SET_STATUS_FAIL:
      return {
        ...state,
        loadingStatus: false,
        error: action.error,
      };
    case actionTypes.PROFILE_RESET:
      return {
        posts: null,
        name: null,
        email: null,
        status: null,
        error: null,
        loadingProfile: false,
        loadingStatus: false,
      };
    default:
      return state;
  }
};

export default reducer;
