import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  loginLoading: false,
  loginError: null,
  signUpLoading: false,
  signUpError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return {
        ...state,
        isAuth: false,
        loginLoading: true,
        loginError: null,
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        userId: action.userId,
        loginLoading: false,
        loginError: null,
      };
    case actionTypes.AUTH_LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        isAuth: false,
        loginError: action.error,
      };

    case actionTypes.AUTH_SIGNUP_START:
      return {
        ...state,
        signUpLoading: true,
        signUpError: null,
      };
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpError: null,
      };
    case actionTypes.AUTH_SIGNUP_FAILED:
      return {
        ...state,
        isAuth: false,
        signUpLoading: false,
        signUpError: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        loginLoading: false,
        loginError: null,
        signUpLoading: false,
        signUpError: null,
      };
    default:
      return state;
  }
};

export default reducer;
