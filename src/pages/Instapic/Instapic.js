import React, { Component, Fragment } from 'react';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import ImageList from '../../components/ImageList/ImageList';

import PostImage from '../../container/PostImage/PostImage';

import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';


import classes from './Instapic.module.css';

class Instapic extends Component {
  state = {
    images: [
      { id: 'image1', path: image1, alt: 'image1' },
      { id: 'image2', path: image2, alt: 'image2' },
      { id: 'image3', path: image3, alt: 'image3' },
    ],
    showPostImage: false,
  };

  togglePostImage = () => {
    this.setState(prevState => ({
      showPostImage: !prevState.showPostImage,
    }));
  };

  render() {
    return (
      <Fragment>
        {this.state.showPostImage ? <PostImage close={this.togglePostImage} /> : null}
        <Layout>
          <div className={classes.Options}>
            <Button onClick={this.togglePostImage}>Upload Image</Button>
          </div>
          <ImageList images={this.state.images} />
        </Layout>
      </Fragment>
    );
  }
}

export default Instapic;
