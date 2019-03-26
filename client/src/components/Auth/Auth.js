import React from 'react';
import classes from './Auth.module.css';

const auth = ({ children }) => {
  return (
    <div className={classes.Center}>
      <div className={classes.Auth}>
        <div className={classes.Image} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default auth;
