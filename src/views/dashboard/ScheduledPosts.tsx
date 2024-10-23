/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { format } from 'date-fns';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Box, Theme, Card } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'views/common/constant';
import gql from 'store/dashboard/gql';
import { ISocialEnum } from 'types';

// assets
import FacebookIcon from 'assets/images/icons/fb.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import GoogleAdsIcon from 'assets/images/icons/g-ads.svg';
import InstagramIcon from 'assets/images/icons/ig.png';
import TwitterIcon from 'assets/images/icons/tw.png';
import MindbodyIcon from 'assets/images/icons/mindbody.png';
import SchedulerEmpty from 'assets/images/pages/scheduler-empty.png';

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
  },
  card: {
    padding: '16px',
    border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
    borderColor: theme.palette.grey[100]
  }
}));

const getImageSocial = {
  FACEBOOKPAGE: FacebookIcon,
  FACEBOOKADS: FacebookIcon,
  INSTAGRAM: InstagramIcon,
  TWITTER: TwitterIcon,
  TWITTERSCHEDULER: TwitterIcon,
  LINKEDIN: LinkedinIcon,
  GOOGLE: GoogleAdsIcon,
  MINDBODY: MindbodyIcon
};

interface IScheduledPost {
  postAt: string;
  type: ISocialEnum;
  mediaUrl: string;
  caption: string;
}

const ScheduledPosts = (props: any) => {
  const classes = useStyles();

  const [getUpcomingScheduledPost, { data: upcomingScheduledPostData }] = useLazyQuery<{
    upcomingScheduledPost: IScheduledPost[];
  }>(gql.query.upcomingScheduledPost, {
    fetchPolicy: 'network-only'
  });
  const upcomingScheduledPost = upcomingScheduledPostData?.upcomingScheduledPost || [];
  // console.log(upcomingScheduledPost);

  useEffect(() => {
    getUpcomingScheduledPost();
  }, []);

  return (
    <MainCard sx={{ height: '100%' }} contentSX={{ p: '0!important' }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12}>
          <Box className={classes.box} sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ color: 'common.white' }}>
              Scheduled Posts
            </Typography>
            <Typography component={Link} to="/scheduler" className={classes.link}>
              View Calendar
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={gridSpacing}>
              {upcomingScheduledPost.length ? (
                upcomingScheduledPost.map((item, index: number) => (
                  <Grid key={index} item xs={12}>
                    <Card className={classes.card}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                          <Typography>{format(new Date(item.postAt), 'do LLL YYY h.mmaaa')}</Typography>
                          {/* <img src={getImageSrc(item.type)} alt="social" width={30} height={30} /> */}
                          <img src={getImageSocial[item.type]} alt="social" width={30} height={30} />
                        </Grid>
                        <Grid item xs={12} display="flex">
                          <img src={item.mediaUrl} alt="social" width={95} height={100} />
                          <Typography sx={{ ml: 2.5, color: 'grey.600' }}>{item.caption}</Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} textAlign="center">
                  <img src={SchedulerEmpty} alt="empty" />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ScheduledPosts;
