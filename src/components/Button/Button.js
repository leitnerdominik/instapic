import React from 'react';

import classes from './Button.module.css';

const button = ({children, disabled}) => {
  return (
    <button disabled={disabled} className={classes.Button}><span className={classes.Text}>{children}</span></button>
  );
}

export default button;