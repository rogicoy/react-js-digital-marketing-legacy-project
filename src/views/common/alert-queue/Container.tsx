/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect } from 'react';
import { Snackbar, Alert, AlertColor } from '@material-ui/core';
import { AlertQueueProps } from './types';

const Container = (props: AlertQueueProps) => {
  const { children, topAlert, isOpenAlert, doOpenAlert, doDequeueAlert } = props;
  const severity: AlertColor = topAlert ? topAlert.type : 'error';
  const message: string = topAlert ? topAlert.message : '';

  useEffect(() => {
    if (topAlert) {
      doOpenAlert(true);
    }
  }, [topAlert]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason !== 'clickaway') {
      doOpenAlert(false);
    }
  };

  const handleExited = () => {
    doDequeueAlert();
  };

  return (
    <>
      {children}
      <Snackbar
        open={isOpenAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Container;
