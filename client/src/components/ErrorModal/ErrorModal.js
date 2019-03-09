import React, { Fragment } from 'react';

import Modal from '../Modal/Modal';

const errorModal = ({ error, close }) => {
  return (
    <Fragment>
      {/* {error && <Backdrop onClick={close} />} */}
      {error && (
        <Modal close={close}>
          <p>{error}</p>
        </Modal>
      )}
    </Fragment>
  );
};

export default errorModal;
