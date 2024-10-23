/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState, FC } from 'react';
import { gridSpacing } from 'views/common/constant';
import useAuth from 'hooks/useAuth';

// material ui
import { Grid, Divider, Stack, Button, Box } from '@material-ui/core';

// components
import { SocialAccountCardProps } from 'ui-component/cards/SocialAccountCard';
import SocialAccount from 'views/account/socials/SocialAccount';
import LoaderCircle from 'ui-component/LoaderCircle';

// assets
import FacebookIcon from 'assets/images/icons/fb.png';
import LinkedinIcon from 'assets/images/icons/li.png';
import InstagramIcon from 'assets/images/icons/ig.png';
import TwitterIcon from 'assets/images/icons/tw.png';

const FormConnectSocials: FC = () => {
  const { updateUserOnboard } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socialAccounts: SocialAccountCardProps[] = [
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
      name: 'Linkedin',
      description: 'Schedule posts, and view in depth analytics.',
      variant: 'connect',
      type: 'linkedin',
      imgSrc: LinkedinIcon
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
    }
  ];

  const handleNext = async () => {
    setIsLoading(true);
    await updateUserOnboard({ step: 'CONTENT' });
  };

  const handleGoBack = async () => {
    await updateUserOnboard({ step: 'CLOSE' });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {socialAccounts.map((account) => (
            <Grid key={account.name} item xs={12} md={4} lg={4}>
              <SocialAccount {...account} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="text" onClick={() => handleGoBack()}>
            Back
          </Button>

          <Button type="submit" variant="contained" onClick={() => handleNext()}>
            Next
          </Button>
        </Stack>
      </Grid>

      {isLoading && (
        <Box>
          <LoaderCircle />
        </Box>
      )}
    </Grid>
  );
};

export default FormConnectSocials;
