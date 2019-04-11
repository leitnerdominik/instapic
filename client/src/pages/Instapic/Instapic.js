import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Button from '../../components/Button/Button';
import Layout from '../../container/Layout/Layout';
// import ImageList from '../../components/ImageList/ImageList';
import Posts from '../../components/Posts/Posts';
import PostImage from '../../container/PostImage/PostImage';
import Spinner from '../../components/Spinner/Spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

import * as action from '../../store/actions/index';

import classes from './Instapic.module.css';

class Instapic extends Component {
  componentDidMount() {
    const { onFetchPosts, onFetchProfile, isAuth, token } = this.props;
    onFetchPosts();

    if (isAuth && token) {
      onFetchProfile(token);
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuth, onFetchProfile, token } = this.props;
    if (isAuth && isAuth !== prevProps.isAuth) {
      onFetchProfile(token);
    }
  }

  sharePostMessage = () => {
    toast.info(`Post link copied! :)`);
  };

  togglePostImage = () => {
    this.setState(prevState => ({
      showPostImage: !prevState.showPostImage,
    }));
  };

  render() {
    const {
      isAuth,
      token,
      profileStatus,
      postsError,
      onPostsReset,
      showPostModal,
      onShowPostImage,
      loadingPosts,
      posts,
      onDeletePost,
      onSearchEditPost,
      onLikePost,
    } = this.props;

    let status = null;
    if (isAuth && profileStatus) {
      status = (
        <span className={classes.Status}>
          {'Status: '}
          <br />
          {profileStatus}
        </span>
      );
    }

    return (
      <Fragment>
        {postsError ? (
          <ErrorModal close={onPostsReset} error={postsError} />
        ) : null}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {showPostModal ? <PostImage toggleShow={onShowPostImage} /> : null}
        <Layout>
          {isAuth && (
            <div className={classes.Options}>
              {status}
              <Button onClick={onShowPostImage}>Upload Image</Button>
            </div>
          )}
          {loadingPosts && (
            <div className={classes.Center}>
              <Spinner />
            </div>
          )}
          {posts.length <= 0 && !loadingPosts ? (
            <p className={classes.Center}>No posts found!</p>
          ) : null}
          {posts.length > 0 && !loadingPosts ? (
            <Posts
              postsData={posts}
              editPost={postId => onSearchEditPost(postId, posts)}
              deletePost={postId => onDeletePost(postId, token)}
              likePost={(event, postId) => {
                event.preventDefault();
                onLikePost(postId, token);
              }}
              sharePost={this.sharePostMessage}
            />
          ) : // <ImageList
          //   posts={posts}
          //   deletePost={postId => onDeletePost(postId, token)}
          //   editPost={postId => onSearchEditPost(postId, posts)}
          //   likePost={(event, postId) => {
          //     event.preventDefault();
          //     onLikePost(postId, token);
          //   }}
          //   sharePost={this.sharePostMessage}
          //   isAuth={isAuth}
          // />
          null}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profileStatus: state.user.user.status,
  isAuth: state.auth.isAuth,
  token: state.auth.token,
  posts: state.posts.posts,
  postsError: state.posts.error,
  loadingPosts: state.posts.loading,
  addPostError: state.post.error,
  showPostModal: state.post.showPostModal,
});

const mapDispatchToProps = dispatch => ({
  onFetchPosts: () => dispatch(action.fetchPosts()),
  onShowPostImage: () => dispatch(action.togglePostModal()),
  onSearchEditPost: (postId, posts) =>
    dispatch(action.searchEditPost(postId, posts)),
  onDeletePost: (postId, token) => dispatch(action.deletePost(postId, token)),
  onPostsReset: () => dispatch(action.postsReset()),
  onFetchProfile: token => dispatch(action.fetchProfile(token)),
  onLikePost: (postId, token) => dispatch(action.likePost(postId, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Instapic);
