import React from 'react';

import classes from './Button.module.css';

const button = ({children, disabled, onClick}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={classes.Button}><span className={classes.Text}>{children}</span></button>
  );
}

export default button;