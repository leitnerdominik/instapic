import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../Image/Image';
import Button from '../Button/Button';

import classes from './ImageList.module.css';

const imageList = ({ images }) => {
  const img = images.map(image => (
    <div key={image._id} className={classes.Container}>
      <h2>{image.title}</h2>
      <div className={classes.ImageContainer}>
        <Image imgUrl={image.imgUrl} />
      </div>
      <p>{image.description}</p>
      <div className={classes.ButtonContainer}>
        <Button design="transparent">
          <FontAwesomeIcon
            style={{
              color: 'red',
            }}
            icon="heart"
            size="2x"
          />
        </Button>
        <Button design="cancel">Delete</Button>
        <Button>Edit</Button>
      </div>
    </div>
  ));
  return <div className={classes.ImageList}>{img}</div>;
};

export default imageList;
