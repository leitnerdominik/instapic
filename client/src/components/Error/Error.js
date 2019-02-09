import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Error.module.css';

const error = ({ type }) => {
  return (
    <div className={classes.WrongForm}>
      <FontAwesomeIcon icon="exclamation-triangle" />
      <span>Verification failed. Please try again.</span>
    </div>
  );
};

export default error;
