import React from 'react';
import classes from './Auth.module.css';

const auth = ({children}) => {
  return (
    <div className={classes.Auth}>
      {children}
    </div>
  )
}

export default auth;