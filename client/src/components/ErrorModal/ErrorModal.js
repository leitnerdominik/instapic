import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import classes from './ErrorModal.module.css';

const errorModal = ({ error, close }) => {
  return (
    <Fragment>
      {/* {error && <Backdrop onClick={close} />} */}
      {error && (
        <Modal close={close}>
          <div className={classes.ErrorModal}>
            <div className={classes.SubTitle}>
              <FontAwesomeIcon size="2x" icon="exclamation-triangle" />
              <span>Error!</span>
            </div>
            <p>{error}</p>
            <Button design="cancel" onClick={close}>
              {'Close'}
            </Button>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default errorModal;
