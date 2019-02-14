import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Error.module.css';

const error = ({ type, children }) => {
  return (
    <div className={classes.WrongForm}>
      <FontAwesomeIcon icon="exclamation-triangle" />
      <span>{children}</span>
    </div>
  );
};

export default error;
