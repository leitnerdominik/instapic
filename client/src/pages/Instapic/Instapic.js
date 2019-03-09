import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import Layout from '../../container/Layout/Layout';
import ImageList from '../../components/ImageList/ImageList';
import PostImage from '../../container/PostImage/PostImage';
import Spinner from '../../components/Spinner/Spinner';

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
        {this.state.showPostImage ? (
          <PostImage close={this.togglePostImage} />
        ) : null}
        <Layout>
          <div className={classes.Options}>
            <Button onClick={this.togglePostImage}>Upload Image</Button>
          </div>
          {this.props.loadingPosts && (
            <div className={classes.Center}>
              <Spinner />
            </div>
          )}
          {this.props.posts.length <= 0 && !this.props.loadingPosts ?  (
            <p className={classes.Center}>No posts found!</p>
          ) : null}
          {this.props.posts.length > 0 && !this.props.loadingPosts ? (
            <ImageList images={this.props.posts} />
          ) : null}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loadingPosts: state.posts.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(action.fetchPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instapic);
