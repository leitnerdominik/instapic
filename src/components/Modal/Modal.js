import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = ({ children, close }) =>
  ReactDOM.createPortal(
    <Fragment>
      <Backdrop onClick={close} />
      <div className={classes.Modal}>{children}</div>
    </Fragment>,
    document.getElementById('modal-root')
  );

export default modal;
