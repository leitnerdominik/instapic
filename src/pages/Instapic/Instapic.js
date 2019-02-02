import React, { Component } from 'react';

import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';

import Layout from '../../components/Layout/Layout';
import ImageList from '../../components/ImageList/ImageList';;


class Instapic extends Component {
  state = {
    images: [
      { id: "image1", path: image1, alt: "image1"},
      { id: "image2", path: image2, alt: "image2"},
      { id: "image3",path: image3, alt: "image3"}
    ]
  }
  render() {
    return (
      <Layout>
        <ImageList images={this.state.images} />
      </Layout>
    );
  }
}

export default Instapic;
