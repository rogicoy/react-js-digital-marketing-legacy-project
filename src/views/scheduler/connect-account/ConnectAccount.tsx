/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';
import { SocialAccountCardProps } from 'ui-component/cards/SocialAccountCard';

// material ui
import { Box, Grid, Typography } from '@material-ui/core';

// components
import MainCard from 'ui-component/cards/MainCard';
import SocialAccount from 'views/account/socials/SocialAccount';

// assets
import FacebookIcon from 'assets/images/icons/fb.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import InstagramIcon from 'assets/images/icons/ig.png';
import TwitterIcon from 'assets/images/icons/tw.png';
import FullBlob from 'assets/images/pages/full-blob.png';

const ConnectAccount: FC = () => {
  const socialAccounts: SocialAccountCardProps[] = [
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
      name: 'Facebook Page',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'facebookPage',
      imgSrc: FacebookIcon
    },
    {
      name: 'Linkedin',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'linkedin',
      imgSrc: LinkedinIcon
    }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundImage: `url(${FullBlob})`,
          height: '325px',
          width: '325px',
          zIndex: 99,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          bottom: '-80px',
          left: '-50px'
        }}
      />
      <MainCard sx={{ background: 'linear-gradient(180deg, #7F66EB 0%, #9618F7 100%)', padding: 2, position: 'relative' }}>
        <Grid container spacing={gridSpacing}>
          <Grid item container md={4}>
            <Box>
              <Typography variant="h1" sx={{ color: '#ffffff', mb: 5 }}>
                Content Scheduler
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'normal' }}>
                Connect an account to get started
              </Typography>
            </Box>
          </Grid>
          <Grid item container md={8}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                {socialAccounts.map((account) => (
                  <Grid key={account.name} item xs={12} md={6} lg={6}>
                    <SocialAccount {...account} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
};

export default ConnectAccount;
