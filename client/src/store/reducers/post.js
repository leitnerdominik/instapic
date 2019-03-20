import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  post: null,
  creator: null,
  showPostModal: false,
  editPost: null,
  isEditing: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_AND_RESET:
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
        showPostModal: !state.showPostModal,
        isEditing: false,
        editPost: null,
      }
    case actionTypes.SEARCH_EDIT_POST:
      const postId = action.postId;
      const posts = action.posts;
      const editPost = posts.filter(post => post._id === postId);
      return {
        ...state,
        editPost: editPost[0],
        isEditing: true,
        showPostModal: true,
      }
    default:
      return state;
  }
};

export default reducer;
