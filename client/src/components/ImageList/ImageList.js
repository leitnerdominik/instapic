import React from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../Image/Image';
import Button from '../Button/Button';

import classes from './ImageList.module.css';

const imageList = ({ images }) => {
  const maxDescriptionLength = 100;
  const img = images.map(image => {
    let description = image.description;
    if (image.description.length > maxDescriptionLength) {
      description = `${image.description.slice(0, maxDescriptionLength)}...`
    }
    return (
    <div key={image._id} className={classes.Container}>
      <Link to={`post/${image._id}`}><h2>{image.title}</h2></Link>
      <div className={classes.ImageContainer}>
        <Image imgUrl={image.imgUrl} />
      </div>
      <p>{description}</p>
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
    )
  });
  return <div className={classes.ImageList}>{img}</div>;
};

export default imageList;
