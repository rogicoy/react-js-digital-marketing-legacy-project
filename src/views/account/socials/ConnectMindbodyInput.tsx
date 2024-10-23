/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, TextField } from '@material-ui/core';
import MindbodyIcon from 'assets/images/icons/mindbody.png';

interface IConnectMindbodyInput {
  open: boolean;
  onClose: (x?: any) => void | Promise<any>;
  onConnect: (values: { siteId: number; username: string; password: string }) => void | Promise<any>;
  data?: any;
  isLoading?: boolean;
  keepMounted: boolean;
}

const ConnectMindbodyInput: FC<IConnectMindbodyInput> = ({ open, data, onClose, isLoading, onConnect, ...other }) => {
  const [values, setValues] = useState({
    siteId: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    setValues({ siteId: '', username: '', password: '' });
  }, [open]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnect = () => {
    const formattedValues = {
      ...values,
      siteId: Number(values.siteId)
    };
    onConnect(formattedValues);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 520, fontSize: '1rem' } }}
      maxWidth="sm"
      open={open}
      onClose={() => {
        onClose();
      }}
      {...other}
    >
      <DialogTitle>Mindbody</DialogTitle>
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <img alt="Mindbody" src={MindbodyIcon} />
          </Grid>
          <Grid item xs>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography color="black" fontSize="inherit">
                  Securely sign into your Mindbody account to connect it with REMOVED.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Site ID" name="siteId" value={values.siteId} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" name="username" value={values.username} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" type="password" name="password" value={values.password} onChange={handleChange} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isLoading || (!values.siteId && !values.username && !values.password)}
          color="primary"
          variant="contained"
          sx={{ px: 8 }}
          onClick={handleConnect}
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectMindbodyInput;
