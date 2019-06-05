import React from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import history from '../utils/history';
import '../styles/TodoModal.css';

export default () => {
  return (
    <Modal open={true}>
      <div className="modal-content">
        <IconButton color="primary" size="small" onClick={() => {
          history.push(`/`)
        }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        test
      </div>
    </Modal>
  );
};
