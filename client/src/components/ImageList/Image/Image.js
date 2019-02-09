import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../Button/Button';

import classes from './Image.module.css';

const image = ({ path, alt, title, description }) => {
  return (
    <div className={classes.ImageContainer}>
      <h2>{title}</h2>
      <div className={classes.Image}>
        <img src={path} alt={alt} />
      </div>
      <p>{description}</p>
      <div className={classes.ButtonContainer}>
        <Button type='transparent'>
          <FontAwesomeIcon style={{
            color: 'red'
          }} icon='heart' size="2x" />
        </Button>
        <Button type="cancel">Delete</Button>
        <Button>Edit</Button>
      </div>
    </div>
  );
};

export default image;
