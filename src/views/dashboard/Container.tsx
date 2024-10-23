/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'views/common/constant';
import useAuth from 'hooks/useAuth';
import TodoCard from './TodoCard';
import ConnectedAccounts from './ConnectedAccounts';
import AdsSnapshot from './AdsSnapshot';
import FollowerTrend from './FollowerTrend';
import ScheduledPosts from './ScheduledPosts';

const useStyles = makeStyles((theme: Theme) => ({
  mainCard: {
    background: 'linear-gradient(180deg, #7F66EB 0%, #9618F7 100%)'
  }
}));

const Container = (props: any) => {
  const classes = useStyles();
  const auth = useAuth();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MainCard className={classes.mainCard}>
          <Typography gutterBottom variant="h1" sx={{ mb: 0, color: 'common.white' }}>
            Hi, {auth.user?.firstName}!
          </Typography>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <TodoCard />
      </Grid>

      <Grid item xs={12}>
        <ConnectedAccounts />
      </Grid>

      <Grid item xs={12}>
        <AdsSnapshot />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h2" sx={{ mb: 0 }}>
              Organic Content Summary
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FollowerTrend />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ScheduledPosts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Container;
