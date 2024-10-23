/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import create from 'zustand';

// material ui
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const ConfirmDialog: FC = () => {
  const { message, onSubmit, close, open } = useConfirmDialogStore();

  return (
    <Dialog open={Boolean(open)} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (onSubmit) onSubmit(true);
            close();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useConfirmDialogStore = create((set: any) => ({
  message: '',
  open: false,
  onSubmit: (x: boolean) => set({ x }),
  close: () => set({ open: false })
}));

export const confirmDialog = ({
  message,
  open,
  onSubmit
}: {
  message: string;
  open: boolean;
  onSubmit: (x: boolean) => Promise<any> | void;
}) => {
  useConfirmDialogStore.setState({
    open,
    message,
    onSubmit
  });
};

export default ConfirmDialog;
