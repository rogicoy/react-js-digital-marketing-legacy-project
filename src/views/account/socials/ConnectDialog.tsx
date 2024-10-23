/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
  Box,
  Link
} from '@material-ui/core';

import Avatar from 'ui-component/extended/Avatar';

import { IOptionItem, ISocialAccountType } from 'types';
import Chip from 'ui-component/extended/Chip';

interface IConnectDialog {
  title: string;
  open: boolean;
  onClose: (x?: any) => void | Promise<any>;
  onDisconnect: (x?: any) => void | Promise<any>;
  data: any;
  isLoading?: boolean;
  keepMounted: boolean;
}

const ConnectDialog: FC<IConnectDialog> = ({ title, open, data, onClose, isLoading = false, onDisconnect, ...other }) => {
  const [options, setOptions] = useState<IOptionItem[]>([]);
  const [value, setValue] = useState(data?.value as string);
  const type: ISocialAccountType = data?.type;

  useEffect(() => {
    if (Array.isArray(data?.pages)) {
      const newOptions = data?.pages?.map((e: any): IOptionItem => ({ label: e.name, value: e.id, meta: e }));
      setOptions(newOptions);
    }
  }, [data?.pages]);

  useEffect(() => {
    if (!open) {
      setValue(data?.value);
    }
  }, [data?.value, open]);

  const handleSave = () => {
    const object = options.find((e) => e.value === value);
    onClose(object);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setValue(name);
    } else {
      setValue('');
    }
  };

  const pic = data?.fbPic || data?.instagram?.pic || data?.picture;
  const name = data?.fbName || data?.instagram?.name || data?.name;
  const id = data?.fbId || data?.instagram?.id || data?.id;

  let oneLabel = '';
  let helpText = '';

  switch (type) {
    case 'facebookPage':
      oneLabel = 'Facebook page';
      break;
    case 'facebookAds':
      oneLabel = 'Facebook ads account';
      break;
    case 'linkedin':
      oneLabel = 'Linkedin account';
      break;
    case 'twitterScheduler':
      oneLabel = 'Twitter scheduler account';
      break;
    case 'twitterAnalytics':
      oneLabel = 'Twitter analytics account';
      break;
    case 'instagram':
      oneLabel = 'Instagram account';
      helpText =
        'In order to work with REMOVED, your Instagram account needs to be set up as business account. Instagram Business accounts are available to everyone and easy to set up.';
      break;
    case 'googleAds':
      oneLabel = 'Google ads account';
      break;
    case 'mindbody':
      oneLabel = '';
      break;
    default:
      break;
  }

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="Profile" src={pic} />
              </Grid>
              <Grid item>
                <Typography color="black" fontSize="inherit">
                  {name}
                </Typography>
                <Typography fontSize="inherit">ID: {id}</Typography>
              </Grid>
              <Grid item justifySelf="flex-end" marginLeft="auto">
                <Button disabled={data?.disconnectLoading} color="error" variant="text" sx={{ py: 0, px: 1 }} onClick={onDisconnect}>
                  Disconnect
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {oneLabel && (
            <Grid item>
              <Typography color="black" fontSize="inherit">
                You can connect <b>one</b> {oneLabel} to REMOVED. Which would you like to connect?
              </Typography>
            </Grid>
          )}
          {helpText && (
            <Grid item>
              <Typography variant="caption">{helpText}</Typography>
              <Link
                href="https://removed"
                underline="none"
                target="_blank"
                sx={{ display: 'block', fontSize: '.8rem' }}
              >
                Read more
              </Link>
            </Grid>
          )}
          <Grid item>
            <FormGroup>
              <Grid container spacing={1} direction="column">
                {isLoading && 'Loading...'}
                {options.map((option) => (
                  <Grid key={option.value} item>
                    <FormControlLabel
                      key={option.value}
                      label={
                        <Box display="flex" flexDirection="column" fontSize="1rem">
                          <Box display="flex">
                            <Typography color="black" fontSize="inherit" sx={{ mr: 1 }}>
                              {option.label}
                            </Typography>
                            {type === 'instagram' && !option.meta?.is_business_account && (
                              <Chip label="Not a business account" chipcolor="error" sx={{ fontSize: '.75rem' }} />
                            )}
                          </Box>
                          <Typography fontSize="inherit">ID: {option.value}</Typography>
                        </Box>
                      }
                      control={<Switch name={option.value as string} checked={option.value === value} onChange={handleChange} />}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={!options.length} color="primary" variant="contained" sx={{ px: 8 }} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectDialog;
