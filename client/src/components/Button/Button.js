import React from 'react';

import classes from './Button.module.css';

const button = ({ children, type, disabled, onClick }) => {
  const buttonClasses = [classes.Button];
  if (type === 'submit') {
    buttonClasses.push(classes.Submit);
  } else if (type === 'cancel') {
    buttonClasses.push(classes.Cancel);
  } else if (type === 'transparent') {
    buttonClasses.push(classes.Transparent);
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses.join(' ')}
    >
      <span className={classes.Text}>{children}</span>
    </button>
  );
};

export default button;
