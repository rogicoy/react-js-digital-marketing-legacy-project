/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Theme, Typography } from '@material-ui/core';

// assets
import FacebookIcon from 'assets/images/icons/fb.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import GoogleAdsIcon from 'assets/images/icons/g-ads.svg';
import InstagramIcon from 'assets/images/icons/ig.png';
import TwitterIcon from 'assets/images/icons/tw.png';
import MindbodyIcon from 'assets/images/icons/mindbody.png';

// project imports
import { gridSpacing } from 'views/common/constant';
import { SocialAccountCardProps } from 'ui-component/cards/SocialAccountCard';
import MainCard from 'ui-component/cards/MainCard';
import SocialAccount from './SocialAccount';

import ConnectPuzzle from 'assets/images/pages/connect-puzzle.png';
import Bubble from 'assets/images/pages/bubble.png';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  mainCard: {
    padding: theme.spacing(0.75),
    position: 'relative',
    background: 'linear-gradient(180deg, #7F66EB 0%, #9618F7 100%)',
    boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
    borderRadius: 12
  },
  bubbleBox: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}));

const Container = () => {
  const classes = useStyles();
  const [socialAccounts] = React.useState<SocialAccountCardProps[]>([
    {
      name: 'Facebook Page',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'facebookPage',
      imgSrc: FacebookIcon
    },
    {
      name: 'Facebook Ads',
      description: 'Launch ads on Facebook and Instgram, and track their performance with our analytics.',
      variant: 'connect',
      type: 'facebookAds',
      imgSrc: FacebookIcon
    },
    {
      name: 'Google Ads',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'googleAds',
      imgSrc: GoogleAdsIcon
    },
    {
      name: 'Instagram',
      description: 'Schedule images and video, and view in depth analytics.',
      variant: 'connect',
      type: 'instagram',
      imgSrc: InstagramIcon
    },
    {
      name: 'Twitter Scheduler',
      description: 'Schedule tweets using our content calendar.',
      variant: 'connect',
      type: 'twitterScheduler',
      imgSrc: TwitterIcon
    },
    {
      name: 'Twitter Analytics',
      description: 'Get a detailed report on individual tweet performance and audience insights.',
      variant: 'connect',
      type: 'twitterAnalytics',
      imgSrc: TwitterIcon
    },
    {
      name: 'Linkedin',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'linkedin',
      imgSrc: LinkedinIcon
    },
    {
      name: 'Mindbody',
      description: 'Flow your leads from Facebook Ads directly into your Mindbody CRM.',
      variant: 'connect',
      type: 'mindbody',
      imgSrc: MindbodyIcon
    }
  ]);

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard className={classes.mainCard}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ position: 'relative', zIndex: 9 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img
                    src={ConnectPuzzle}
                    alt="Connect Puzzle"
                    style={{
                      width: '114px',
                      height: '114px',
                      objectFit: 'cover',
                      transform: 'rotate(-30deg)'
                    }}
                  />
                  <Box>
                    <Typography gutterBottom variant="h2" sx={{ color: '#fff', fontSize: '2.125rem', fontWeight: 'bold' }}>
                      Connect your accounts
                    </Typography>
                    <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                      Connect your accounts to create ads, view analytics and schedule content
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className={classes.bubbleBox}>
              <img
                src={Bubble}
                alt="Bubble"
                style={{
                  width: '300px',
                  height: '114px',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {socialAccounts.map((account) => (
              <Grid key={account.name} item xs={12} md={6} lg={4}>
                <SocialAccount {...account} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Container;
