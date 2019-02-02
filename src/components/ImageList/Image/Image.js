import React from 'react';

import classes from './Image.module.css';

const image = ({path, alt}) => {
  return (
    <div className={classes.Image}>
      <img src={path} alt={alt} />
    </div>
  )
}

export default image;