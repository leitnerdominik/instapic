import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => {
  return (
    <div className={classes.Spinner}>
      <div className={classes.Roller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default spinner;
