/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import startCase from 'lodash/startCase';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Box, Theme } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import FollowerGrowthMultiSeries from 'views/common/components/FollowerGrowthMultiSeries';
import gql from 'store/dashboard/gql';

// assets
import InstagramIcon from 'assets/images/icons/ig.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import FacebookIcon from 'assets/images/icons/fb.png';
import TwitterIcon from 'assets/images/icons/tw.png';

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    background: '#9618F7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    fontSize: '1rem',
    fontWeight: 500,
    textDecoration: 'none',
    color: theme.palette.common.white
  }
}));

interface IValues {
  count: number;
  date: string;
}

interface ISeries {
  name: string;
  data: {
    x: string;
    y: number;
  }[];
}

const FollowerTrend = (props: any) => {
  const classes = useStyles();

  const [getAccountMetrics, { data: accountMetricsData }] = useLazyQuery(gql.query.accountMetrics, {
    fetchPolicy: 'network-only'
  });
  const accountMetrics = accountMetricsData?.accountMetrics;

  useEffect(() => {
    getAccountMetrics();
  }, []);

  const series = useMemo(() => {
    const chartSeries: ISeries[] = [];
    if (accountMetrics) {
      Object.entries(accountMetrics).forEach((each) => {
        const [key, values] = each as [string, IValues[]];
        if (['facebook', 'twitter', 'instagram'].includes(key)) {
          const newSeries: ISeries = {
            name: startCase(key),
            data: values.map((e) => ({ x: e.date, y: e.count }))
          };
          chartSeries.push(newSeries);
        }
      });
    }
    return chartSeries;
  }, [accountMetrics]);

  return (
    <MainCard sx={{ height: '100%' }} contentSX={{ p: '0!important' }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12}>
          <Box className={classes.box} sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ color: 'common.white' }}>
              Follower Trend
            </Typography>
            <Typography component={Link} to="/insights" className={classes.link}>
              View More Insights
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                  -
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={1} justifyContent="end">
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <img src={InstagramIcon} alt="social" width={30} height={30} />
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <img src={LinkedinIcon} alt="social" width={30} height={30} />
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <img src={FacebookIcon} alt="social" width={30} height={30} />
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <img src={TwitterIcon} alt="social" width={30} height={30} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <FollowerGrowthMultiSeries series={series} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default FollowerTrend;
