/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect, useState } from 'react';

// material-ui imports
import { Card, Grid, Typography } from '@material-ui/core';

// third-party imports
import { Outlet } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CardList from './cards/CardList';
import { IAdItem } from './interface';
import { gridSpacing } from 'views/common/constant';
import AdBrieftTopImage from 'assets/images/etc/ad-brief-top.png';
import AdBrieftBottomImage from 'assets/images/etc/ad-brief-bottom.png';

const Container = () => {
  const [list] = useState<IAdItem[]>([
    {
      id: 1,
      socials: ['google'],
      title: 'Google Search Ad',
      subtitle: 'Get your leads on lock',
      description: 'Get started now and never worry about leads again.',
      link: '/ads/create/google'
    },
    {
      id: 3,
      socials: ['facebook', 'instagram'],
      title: 'Facebook and Instagram',
      subtitle: 'Get your leads on lock',
      description: 'Get started now and never worry about leads again.',
      link: '/ads/create/facebook'
    }
  ]);

  return (
    <MainCard title="Ad Briefs">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={6}>
          <Card
            sx={{
              padding: '60px 30px 120px',
              background: `url(${AdBrieftTopImage}) top left no-repeat, url(${AdBrieftBottomImage}) bottom left no-repeat, linear-gradient(180deg, #7F66EB 0%, #9618F7 100%)`
            }}
          >
            <Typography variant="h1" sx={{ maxWidth: '510px', color: '#FFFFFF' }}>
              What kind of ad would you like to make today?
            </Typography>
            <Typography sx={{ marginTop: '36px', maxWidth: '600px', color: '#FFFFFF' }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Typography variant="h3" sx={{ marginTop: '48px', color: '#FFFFFF' }}>
              🤓 Helpful Resources:
            </Typography>
            <Typography variant="h4" sx={{ marginTop: '24px', fontWeight: 'normal', color: '#FFFFFF' }}>
              Article one - Best Practice
            </Typography>
            <Typography sx={{ marginTop: '4px', color: '#FFFFFF' }}>
              Nunc lobortis mattis aliquam faucibus purus in massa tempor nec.
            </Typography>
            <Typography variant="h4" sx={{ marginTop: '24px', fontWeight: 'normal', color: '#FFFFFF' }}>
              Article two - Inspiration
            </Typography>
            <Typography sx={{ marginTop: '4px', color: '#FFFFFF' }}>
              Nunc lobortis mattis aliquam faucibus purus in massa tempor nec.
            </Typography>
            <Typography variant="h4" sx={{ marginTop: '24px', fontWeight: 'normal', color: '#FFFFFF' }}>
              Article three - Industry Trends
            </Typography>
            <Typography sx={{ marginTop: '4px', color: '#FFFFFF' }}>
              Nunc lobortis mattis aliquam faucibus purus in massa tempor nec.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <CardList list={list} />
        </Grid>
      </Grid>
      <Outlet />
    </MainCard>
  );
};

export default Container;
