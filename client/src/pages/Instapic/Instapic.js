import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Button from '../../components/Button/Button';
import Layout from '../../container/Layout/Layout';
import ImageList from '../../components/ImageList/ImageList';
import PostImage from '../../container/PostImage/PostImage';
import Spinner from '../../components/Spinner/Spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

import * as action from '../../store/actions/index';

import classes from './Instapic.module.css';

class Instapic extends Component {
  state = {
    posts: [],
    showPostImage: false,
  };

  componentDidMount() {
    this.props.onFetchPosts();
  }

  togglePostImage = () => {
    this.setState(prevState => ({
      showPostImage: !prevState.showPostImage,
    }));
  };

  render() {
    return (
      <Fragment>
        {this.props.postsError ? <ErrorModal close={this.props.onPostsReset} error={this.props.postsError} /> : null}
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
        {this.props.showPostModal ? (
          <PostImage toggleShow={this.props.onShowPostImage} />
        ) : null}
        <Layout>
          {this.props.isAuth && (
            <div className={classes.Options}>
              <Button onClick={this.props.onShowPostImage}>Upload Image</Button>
            </div>
          )}
          {this.props.loadingPosts && (
            <div className={classes.Center}>
              <Spinner />
            </div>
          )}
          {this.props.posts.length <= 0 && !this.props.loadingPosts ? (
            <p className={classes.Center}>No posts found!</p>
          ) : null}
          {this.props.posts.length > 0 && !this.props.loadingPosts ? (
            <ImageList
              images={this.props.posts}
              deletePost={postId =>
                this.props.onDeletePost(postId, this.props.token)
              }
              editPost={postId =>
                this.props.onSearchEditPost(postId, this.props.posts)
              }
            />
          ) : null}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    posts: state.posts.posts,
    postsError: state.posts.error,
    loadingPosts: state.posts.loading,
    addPostError: state.post.error,
    showPostModal: state.post.showPostModal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(action.fetchPosts()),
    onShowPostImage: () => dispatch(action.togglePostModal()),
    onSearchEditPost: (postId, posts) =>
      dispatch(action.searchEditPost(postId, posts)),
    onDeletePost: (postId, token) => dispatch(action.deletePost(postId, token)),
    onPostsReset: () => dispatch(action.postsReset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instapic);
