/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme, Box } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'views/common/constant';
import gql from 'store/dashboard/gql';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%'
  },
  cardContent: {
    padding: '.875rem'
  },
  link: {
    fontSize: '1rem',
    fontWeight: 500,
    textDecoration: 'none',
    color: '#9618F7'
  },
  linkSmall: {
    fontSize: '.625rem',
    fontWeight: 400,
    textDecoration: 'none',
    color: '#1565C0'
  },
  box: {
    padding: '.5rem .75rem',
    background: '#C5E2FA',
    borderRadius: 12,
    color: '#1565C0',
    fontWeight: 500
  },
  box2: {
    padding: '.5rem .75rem',
    background: '#F6F6F6',
    borderRadius: 5,
    color: '#000',
    fontWeight: 400
  }
}));

const AdsSnapshot = (props: any) => {
  const classes = useStyles();

  const [getCampaignSummary, { data: campaignSummaryData }] = useLazyQuery(gql.query.campaignSummary, {
    fetchPolicy: 'network-only'
  });
  const campaignSummary = campaignSummaryData?.campaignSummary;

  const [getAdAccountSummary, { data: adAccountSummaryData }] = useLazyQuery(gql.query.adAccountSummary, {
    fetchPolicy: 'network-only'
  });
  const adAccountSummary = adAccountSummaryData?.adAccountSummary;

  useEffect(() => {
    getCampaignSummary();
    getAdAccountSummary();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h2" sx={{ mb: 0 }}>
          Ads Snapshot
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <MainCard className={classes.card} contentClass={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h3">Campaigns</Typography>
                <Typography component={Link} to="/ads/campaigns" className={classes.link}>
                  View All Campaigns
                </Typography>
              </Box>
            </Grid>

            {campaignSummary?.campaignToReview && (
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Typography gutterBottom sx={{ fontSize: '1rem', fontWeight: 'inherit' }}>
                        ⭐ Good news!
                      </Typography>
                      <Typography sx={{ fontSize: '.75rem', fontWeight: 'inherit' }}>
                        Your Campaign ‘Whoo Hoo Test’ is ready to review.
                      </Typography>
                    </Grid>
                    <Grid item xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography component={Link} to="/view" className={classes.linkSmall}>
                        View
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ color: '#000', fontSize: '1rem' }}>
                <Typography gutterBottom>{campaignSummary?.activeCampaign || 0} Active campaigns</Typography>
                <Typography gutterBottom>{campaignSummary?.pauseCampaign || 0} Paused campaigns</Typography>
                <Typography gutterBottom>{campaignSummary?.completedCampaign || 0} Completed campaigns</Typography>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={8}>
        <MainCard className={classes.card} contentClass={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h3">Ad account name summary</Typography>
                <Typography component={Link} to="/ads/reports" className={classes.link}>
                  View Full Report
                </Typography>
              </Box>
              {/* <Box sx={{ color: '#000', fontSize: '1rem' }}>
                <Typography gutterBottom>7th July 2019 - 14th July 2022</Typography>
              </Box> */}
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box className={classes.box2}>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 'inherit' }}>
                      <NumberFormat value={adAccountSummary?.spend?.value || 0} displayType="text" prefix="$" thousandSeparator />
                    </Typography>
                    <Typography sx={{ fontSize: '1.125', fontWeight: 'inherit' }}>Spend</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={classes.box2}>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 'inherit' }}>
                      <NumberFormat value={adAccountSummary?.impression?.value || 0} displayType="text" thousandSeparator />
                    </Typography>
                    <Typography sx={{ fontSize: '1.125', fontWeight: 'inherit' }}>Impressions</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={classes.box2}>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 'inherit' }}>
                      <NumberFormat value={adAccountSummary?.reach?.value || 0} displayType="text" thousandSeparator />
                    </Typography>
                    <Typography sx={{ fontSize: '1.125', fontWeight: 'inherit' }}>Reach</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AdsSnapshot;
