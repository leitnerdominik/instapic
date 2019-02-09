import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.css';

const backdrop = ({ onClick }) =>
  ReactDOM.createPortal(<div className={classes.Backdrop} onClick={onClick}/>, document.getElementById('backdrop-root'));

export default backdrop;
