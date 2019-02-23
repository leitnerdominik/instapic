import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        isAuth: false,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        userId: action.userId,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        isAuth: false,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        loading: false,
      }
    default:
      return state;
  }
};

export default reducer;
