/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { IContentInteractions } from 'types';
import { gridSpacing } from 'views/common/constant';
import { useQuery } from '@apollo/client';
import gql from 'store/insights/gql';

// material ui
import { Grid } from '@material-ui/core';

// components
import FollowerGrowth from 'views/common/components/FollowerGrowth';
import ContentInteractions from 'views/common/components/ContentInteractions';
import TotalCard from 'views/common/components/TotalCard';
import PerformingPosts from 'views/common/components/PerformingPosts';

// assets
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import ShortcutOutlinedIcon from '@material-ui/icons/ShortcutOutlined';
import TopPerformingPosts from './TopPerformingPosts';

const OverviewLinkedin: FC = () => {
  const {
    query: { getLinkedInOverview }
  } = gql;
  const { data: linkedInOverviewData, loading: linkedInOverviewLoading } = useQuery(getLinkedInOverview, { fetchPolicy: 'network-only' });
  const interactions: IContentInteractions[] = [
    {
      icon: <ThumbUpOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: linkedInOverviewData?.data?.numberOfLike || 0,
      subTitle: 'Likes'
    },
    {
      icon: <TelegramIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: linkedInOverviewData?.data?.numberOfShare || 0,
      subTitle: 'Shares'
    },
    {
      icon: <SmsOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: linkedInOverviewData?.data?.numberOfComment || 0,
      subTitle: 'Comments'
    },
    {
      icon: <ShortcutOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: linkedInOverviewData?.data?.numberOfLinkClick || 0,
      subTitle: 'Clicks'
    }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={7}>
            <FollowerGrowth title="Connections Growth" totalFollowers={linkedInOverviewData?.data?.numberOfConnection || 0} />
          </Grid>
          <Grid item md={5}>
            <Grid container spacing={gridSpacing} direction="column">
              <Grid item>
                <ContentInteractions interactions={interactions} />
              </Grid>
              <Grid item>
                <TotalCard title="Total Posts" value={linkedInOverviewData?.data?.totalPost || 0} py="0.4rem" />
              </Grid>
              <Grid item>
                <TotalCard title="Profile Views" value={linkedInOverviewData?.data?.numberOfProfileVisit || 0} py="0.4rem" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={12}>
            <TopPerformingPosts mainTitle="Top performing updates" link="/insights/linkedin/posts" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewLinkedin;
