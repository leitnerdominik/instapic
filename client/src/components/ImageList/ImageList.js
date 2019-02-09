import React from 'react';

import Image from './Image/Image';
import classes from './ImageList.module.css';

const imageList = ({images}) => {

  const img = images.map(image => <Image key={image.id} title={image.title} description={image.description} path={image.path} alt={image.alt} />);
  return (
    <div className={classes.ImageList}>
      {img}
    </div>
  );
}

export default imageList;