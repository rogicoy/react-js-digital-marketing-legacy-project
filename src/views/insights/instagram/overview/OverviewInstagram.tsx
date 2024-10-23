/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo, useRef } from 'react';
import { AudienceFilter, IContentInteractions } from 'types';
import { gridSpacing } from 'views/common/constant';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// components
import TimePost from './TimePost';
import AudienceCard from './audience/AudienceCard';
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
import { format } from 'date-fns';
import { IDateRange } from 'ui-component/date-range-picker';

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
  }
});

interface IOverviewInstagram {
  dateRange?: IDateRange;
}

const OverviewInstagram: FC<IOverviewInstagram> = ({ dateRange }) => {
  const classes = useStyles();
  const audience1 = useRef<{ title: string; type: AudienceFilter }[]>([
    {
      title: 'Cities',
      type: 'CITY'
    },
    {
      title: 'Countries',
      type: 'COUNTRY'
    }
  ]);
  const audience2 = useRef<{ title: string; type: AudienceFilter }[]>([
    {
      title: 'Age',
      type: 'AGE'
    },
    {
      title: 'Gender',
      type: 'GENDER'
    }
  ]);
  const [getInstagramSummaryLazy, { data: instagramSummaryData }] = useLazyQuery(gql.query.instagramSummary, {
    fetchPolicy: 'network-only'
  });
  const instagramSummary = instagramSummaryData?.instagramSummary;

  const [getInstagramFollowersLazy, { data: instagramFollowersData }] = useLazyQuery(gql.query.instagramFollowers, {
    fetchPolicy: 'network-only'
  });
  const instagramFollowers = instagramFollowersData?.instagramFollowers;

  useEffect(() => {
    getInstagramSummaryLazy();
  }, []);

  useEffect(() => {
    getInstagramFollowersLazy({
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
      value: instagramSummary?.likesCount || 0,
      subTitle: 'Likes'
    },
    {
      icon: <TelegramIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: instagramSummary?.sharesCount || 0,
      subTitle: 'Shares'
    },
    {
      icon: <SmsOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: instagramSummary?.commentsCount || 0,
      subTitle: 'Comments'
    },
    {
      icon: <ShortcutOutlinedIcon htmlColor="#874bef" sx={{ height: '30px', width: '30px' }} />,
      value: instagramSummary?.savesCount || 0,
      subTitle: 'Saves'
    }
  ];

  const followersDataLabels = useMemo(() => {
    let data: number[] = [];
    let labels: string[] = [];
    instagramFollowers?.report.forEach((e: { count: number; date: string }) => {
      const [yyyy, mm, dd] = e.date.split('-');
      const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
      const formattedDate = format(date, 'dd LLL yy');
      data = [...data, e.count];
      labels = [...labels, formattedDate];
    });
    return {
      data,
      labels
    };
  }, [instagramFollowers]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={7}>
            <FollowerGrowth
              totalFollowers={instagramFollowers?.followerCount}
              data={followersDataLabels.data}
              labels={followersDataLabels.labels}
            />
          </Grid>
          <Grid item md={5}>
            <Grid container spacing={gridSpacing} direction="column">
              <Grid item>
                <TimePost />
              </Grid>
              <Grid item>
                <ContentInteractions interactions={interactions} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={4}>
            <AudienceCard
              mainTitle="Audience Location"
              initialActiveItem="CITY"
              audienceChart={{
                title: 'Total Accounts Engaged',
                color: '#4285f4'
              }}
              filters={audience1.current}
              dateRange={dateRange}
            />
          </Grid>
          <Grid item md={4}>
            <AudienceCard
              initialActiveItem="AGE"
              mainTitle="Audience Demographic"
              audienceChart={{
                title: 'Total Accounts Reached',
                color: '#874bef'
              }}
              filters={audience2.current}
              dateRange={dateRange}
            />
          </Grid>
          <Grid item md={4}>
            <Grid container spacing={0} direction="column" sx={{ height: '100%' }}>
              <Grid item flexGrow={1} sx={{ mb: 3 }}>
                <TotalCard title="Total Posts" value={instagramSummary?.postCount || 0} className={classes.totalCard} />
              </Grid>
              <Grid item flexGrow={1} sx={{ mb: 3 }}>
                <TotalCard title="Total Stories" value={instagramSummary?.storiesCount || 0} className={classes.totalCard} />
              </Grid>
              <Grid item flexGrow={1}>
                <TotalCard title="Total Link Clicks" value={instagramSummary?.clicksCount || 0} className={classes.totalCard} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={12}>
            <PerformingPosts mainTitle="Top performing posts" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewInstagram;
