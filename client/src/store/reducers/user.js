import * as actionTypes from '../actions/actionTypes';

const initialstate = {
  posts: null,
  user: {
    name: null,
    email: null,
    photoUrl: null,
    status: null,
  },
  error: null,
  loadingProfile: false,
  loadingSaveProfile: false,
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
        user: {
          name: action.name,
          email: action.email,
          photoUrl: action.photoUrl,
          status: action.status,
        },
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
        user: {
          name: null,
          email: null,
          photoUrl: null,
          status: null,
        },
        error: null,
        loadingProfile: false,
        loadingStatus: false,
      };
    case actionTypes.SAVE_PROFILE_START:
      return {
        ...state,
        loadingSaveProfile: true,
        error: null,
      };
    case actionTypes.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        loadingSaveProfile: false,
        user: {
          ...state.user,
          status: action.status,
          photoUrl: action.photoUrl,
        },
      };
    case actionTypes.SAVE_PROFFILE_FAIL:
      return {
        ...state,
        loadingSaveProfile: false,
        error: action.error,
      };
    case actionTypes.STATUS_CHANGE_HANDLER:
      return {
        ...state,
        user: {
          ...state.user,
          status: action.status,
        },
      };
    case actionTypes.PROFILE_RESET:
      return {
        posts: null,
        user: {
          name: null,
          email: null,
          photoUrl: null,
          status: null,
        },
        error: null,
        loadingProfile: false,
        loadingStatus: false,
      };
    default:
      return state;
  }
};

export default reducer;
