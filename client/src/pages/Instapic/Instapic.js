import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import Layout from '../../container/Layout/Layout';
import ImageList from '../../components/ImageList/ImageList';
import PostImage from '../../container/PostImage/PostImage';

import * as action from '../../store/actions/index';

import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';

import classes from './Instapic.module.css';

class Instapic extends Component {
  // state = {
  //   images: [
  //     {
  //       id: 'image1',
  //       title: 'image1',
  //       description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam`,
  //       path: image1,
  //       alt: 'image1',
  //     },
  //     {
  //       id: 'image2',
  //       title: 'image2',
  //       description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam`,
  //       path: image2,
  //       alt: 'image2',
  //     },
  //     {
  //       id: 'image3',
  //       title: 'image3',
  //       description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam`,
  //       path: image3,
  //       alt: 'image3',
  //     },
  //   ],
  //   showPostImage: false,
  // };

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
          {this.props.posts.length > 0 ? (
            <ImageList images={this.props.posts} />
          ) : null}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(action.fetchPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instapic);
