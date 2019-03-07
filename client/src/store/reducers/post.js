import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  post: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
        loading: false,
        error: null,
      };
    case actionTypes.ADD_POST_FAIL:
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
