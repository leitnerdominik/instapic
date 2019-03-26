import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../container/Layout/Layout';
import Spinner from '../../components/Spinner/Spinner';
import Image from '../../components/Image/Image';

import { host } from '../../config.json';

import * as actions from '../../store/actions/index';
import classes from './SinglePost.module.css';

class SinglePost extends Component {
  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.onGetPost(postId);
  }


  render() {
    const { post, creator } = this.props;

    let content = <Spinner />
    if (post && creator) {
      content = (
        <section>
          <h1>{post.title}</h1>
          <h2>
            Created by {creator} on{' '}
            {new Date(post.createdAt).toLocaleDateString('en-US')}
          </h2>
          <div className={classes.Image}>
            <Image
              containerWidth="250px"
              containerHeight="250px"
              imgUrl={host + post.imgUrl}
            />
          </div>
          <p>{post.description}</p>
        </section>
      );
    }
    
    return (
      <Layout>
        <div className={classes.Center}>{content}</div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post.post,
    creator: state.post.creator,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPost: postId => dispatch(actions.getPost(postId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
