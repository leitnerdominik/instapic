import React from 'react';

import classes from './Image.module.css';

const image = ({ imgUrl, contain, left, containerWidth, containerHeight }) => {
  const url = imgUrl.replace(/\\/g, '/');
  return (
    <div
      className={classes.Image}
      style={{
        width: containerWidth,
        height: containerHeight,
        backgroundImage: `url('${url}')`,
        backgroundSize: contain ? 'contain' : 'cover',
        backgroundPosition: left ? 'left' : 'center',
      }}
    />
  );
};

export default image;
