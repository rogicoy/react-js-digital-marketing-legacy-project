/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, Grid, Box, Typography, Theme, Avatar, Skeleton } from '@material-ui/core';
import { ISocialAccountType } from 'types';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  followerBlock: {
    padding: '16px',
    height: 185,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.common.white,
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
    '&:hover': {
      border: `1px solid${theme.palette.primary.main}`
    }
  },
  primaryLight: {
    color: theme.palette.primary[200],
    cursor: 'pointer'
  },
  btnProfile: {
    width: '100%',
    borderRadius: '4px',

    background: '#fff',
    borderColor: '#EDE7F6',
    '&:hover': {
      borderColor: 'transparent'
    },
    '& svg': {
      width: 40,
      height: 40
    }
  },
  bgSecondary: {
    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200],
    '&:hover': {
      background: theme.palette.secondary.light
    }
  },
  bgPrimary: {
    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200],
    '&:hover': {
      background: theme.palette.primary.light
    }
  }
}));

// ==============================|| SOCIAL PROFILE - FRIENDS CARD ||============================== //

export interface SocialAccountCardProps {
  name: string;
  activeName?: string;
  description: string;
  variant: 'connect' | 'connected' | 'reconnect';
  accountName?: string;
  avatarBackgroundColor?: string;
  imgSrc: string;
  type: ISocialAccountType;
  loading?: boolean;
  error?: Error;
  onConnect?: () => void;
  children?: (childProps: { connected: boolean; element: React.ReactElement }) => React.ReactElement;
  hideActionButton?: boolean;
  sx?: object;
}

const SocialAccountCard: React.FC<SocialAccountCardProps> = (props) => {
  const { type, variant, name, description, activeName, imgSrc, loading, error, hideActionButton, sx, onConnect } = props;
  const classes = useStyles();

  let connectLabel = 'Connect';

  switch (type) {
    case 'facebookAds':
    case 'googleAds':
      connectLabel = 'Change Ad Account';
      break;
    case 'facebookPage':
      connectLabel = 'Change Page';
      break;
    case 'linkedin':
      connectLabel = 'Change Profile';
      break;
    case 'instagram':
    case 'twitterScheduler':
    case 'twitterAnalytics':
      connectLabel = 'Change Account';
      break;
    case 'mindbody':
      connectLabel = 'Choose List';
      break;
    default:
      break;
  }

  return (
    <Card className={classes.followerBlock} sx={sx}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item display="flex" alignItems="center">
              {loading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <img
                  src={imgSrc}
                  alt={name}
                  style={{ width: 26, height: 26, filter: variant !== 'connected' ? 'grayscale(100)' : 'unset' }}
                />
              )}
            </Grid>
            <Grid item xs zeroMinWidth display="flex" alignItems="center">
              {loading ? (
                <Skeleton width="100%">
                  <Typography variant="h3">.</Typography>
                </Skeleton>
              ) : (
                <Typography variant="h3">{name}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <Box>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          ) : (
            <Typography>{description}</Typography>
          )}
        </Grid>

        {variant === 'connected' && activeName && (
          <Grid item xs={12}>
            <Box display="flex">
              <Typography sx={{ fontWeight: 500, color: 'grey.800' }}>{activeName}</Typography>
              <Typography>&nbsp;is active.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {!error && !hideActionButton && (
        <Grid container spacing={0}>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            {variant === 'connect' ? (
              <Button disabled={loading} variant="text" sx={{ py: 0, px: 1 }} onClick={onConnect}>
                {variant}
              </Button>
            ) : (
              <Button disabled={loading} color="success" variant="text" sx={{ py: 0, px: 1 }} onClick={onConnect}>
                {connectLabel}
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default SocialAccountCard;
