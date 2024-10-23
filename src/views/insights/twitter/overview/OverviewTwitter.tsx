/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo } from 'react';
import { IContentInteractions } from 'types';
import { gridSpacing } from 'views/common/constant';

// material ui
import { makeStyles } from '@material-ui/styles';
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
import { useLazyQuery } from '@apollo/client';
import gql from 'store/insights/gql';
import gqlAccount from 'store/account/socials/gql';
import { format } from 'date-fns';
import { IDateRange } from 'ui-component/date-range-picker';
import PerformingPostsTwitter from './PerformingPostsTwitter';

const useStyles = makeStyles({
  totalCard: {
    height: '100%',
    '& .MuiPaper-root': {
      display: 'flex'
    },
    '& .MuiCardContent-root': {
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiBox-root': {
      width: '100%'
    }
  },
  interactions: {
    '&.MuiPaper-root': {
      height: '100%'
    },
    '& .MuiCardContent-root': {
      height: '100%',
      '& > .MuiGrid-container': {
        height: '100%'
      }
    }
  }
});

interface IOverviewTwitter {
  dateRange?: IDateRange;
}

const OverviewTwitter: FC<IOverviewTwitter> = ({ dateRange }) => {
  const classes = useStyles();
  const [getTwitterPerformanceLazy, { data: twitterPerformanceData }] = useLazyQuery(gql.query.twitterPerformance, {
    fetchPolicy: 'network-only'
  });
  const twitterPerformance = twitterPerformanceData?.twitterPerformance;

  const [getTwitterConnectionLazy, { data: twitterConnectionData }] = useLazyQuery(gqlAccount.query.twitterConnection, {
    fetchPolicy: 'network-only'
  });
  const twitterConnection = twitterConnectionData?.twitterConnection;

  useEffect(() => {
    getTwitterConnectionLazy({
      variables: { type: 'analytics' }
    });
  }, []);

  useEffect(() => {
    getTwitterPerformanceLazy({
      variables: {
        dateRange: {
          from: dateRange?.from,
          to: dateRange?.to
        }
      }
    });
  }, [dateRange]);

  const interactions: IContentInteractions[] = [
    {
      icon: <ThumbUpOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: twitterPerformance?.likesCount || 0,
      subTitle: 'Likes'
    },
    {
      icon: <TelegramIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: twitterPerformance?.retweetCount || 0,
      subTitle: 'Retweet'
    },
    {
      icon: <SmsOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: twitterPerformance?.profileClickCount || 0,
      subTitle: 'Profile clicks'
    },
    {
      icon: <ShortcutOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: twitterPerformance?.impressionCount || 0,
      subTitle: 'Impressions'
    }
  ];

  const followersDataLabels = useMemo(() => {
    let data: number[] = [];
    let labels: string[] = [];
    if (twitterConnection?.report?.followersReport) {
      twitterConnection?.report?.followersReport.forEach((e: { count: number; date: string }) => {
        const [yyyy, mm, dd] = e.date.split('-');
        const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        const formattedDate = format(date, 'dd LLL yy');
        data = [...data, e.count];
        labels = [...labels, formattedDate];
      });
    }
    return {
      data,
      labels
    };
  }, [twitterConnection]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={7}>
            <FollowerGrowth
              totalFollowers={twitterConnection?.report?.followersCount || 0}
              data={followersDataLabels.data}
              labels={followersDataLabels.labels}
            />
          </Grid>
          <Grid item md={5}>
            <Grid container spacing={0} direction="column" sx={{ height: '100%' }}>
              <Grid item flexGrow={1} sx={{ mb: 3 }}>
                <ContentInteractions className={classes.interactions} interactions={interactions} />
              </Grid>
              <Grid item flexGrow={1} sx={{ mb: 3 }}>
                <TotalCard title="Total Tweets" value={twitterPerformance?.tweetCount || 0} className={classes.totalCard} />
              </Grid>
              <Grid item flexGrow={1}>
                <TotalCard title="Profile Views" value={twitterPerformance?.profileViewCount || 0} className={classes.totalCard} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={12}>
            <PerformingPostsTwitter mainTitle="Top performing tweets" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewTwitter;
