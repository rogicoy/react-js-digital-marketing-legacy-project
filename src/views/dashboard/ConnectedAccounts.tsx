/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
import { gridSpacing } from 'views/common/constant';
import { SocialAccountCardProps } from 'ui-component/cards/SocialAccountCard';

// assets
import FacebookIcon from 'assets/images/icons/fb.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import GoogleAdsIcon from 'assets/images/icons/g-ads.svg';
import InstagramIcon from 'assets/images/icons/ig.png';
import TwitterIcon from 'assets/images/icons/tw.png';
import MindbodyIcon from 'assets/images/icons/mindbody.png';
import SocialAccount from 'views/account/socials/SocialAccount';

const ConnectedAccounts = (props: any) => {
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
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h2" sx={{ mb: 0 }}>
          Connected Accounts
        </Typography>
      </Grid>

      {socialAccounts.map((social) => (
        <SocialAccount key={social.name} {...social} hideActionButton>
          {({ connected, element }) => {
            if (connected) {
              return (
                <Grid item xs={6} lg={4}>
                  {element}
                </Grid>
              );
            }
            return <></>;
          }}
        </SocialAccount>
      ))}
    </Grid>
  );
};

export default ConnectedAccounts;
