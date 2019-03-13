import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  post: null,
  creator: null,
  showPostModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
        post: null,
        creator: null,
      };
    case actionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
        creator: action.creator,
        loading: false,
        error: null,
      };
    case actionTypes.ADD_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.TOGGLE_POST_MODAL:
      return {
        ...state,
        loading: false,
        error: null,
        showPostModal: !state.showPostModal
      }
    default:
      return state;
  }
};

export default reducer;
