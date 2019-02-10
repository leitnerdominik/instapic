import React from 'react';

import classes from './Button.module.css';

const button = ({ children, design, type, disabled, onClick }) => {
  const buttonClasses = [classes.Button];
  if (design === 'submit') {
    buttonClasses.push(classes.Submit);
  } else if (design === 'cancel') {
    buttonClasses.push(classes.Cancel);
  } else if (design === 'transparent') {
    buttonClasses.push(classes.Transparent);
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses.join(' ')}
      type={type}
    >
      <span className={classes.Text}>{children}</span>
    </button>
  );
};

export default button;
