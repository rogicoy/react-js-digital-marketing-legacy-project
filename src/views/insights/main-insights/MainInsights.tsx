/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { gridSpacing } from 'views/common/constant';
import { IGraphCard, IMainInsight } from '../interface';

// material ui
import { Grid, Typography } from '@material-ui/core';

// components
import GraphCard from './graph/GraphCard';

// assets
import Profile from 'assets/images/users/profile.png';

const MainInsights: FC<IMainInsight> = ({ facebook, instagram, twitter, linkedIn, dateRange }) => {
  const cardGraph: IGraphCard[] = [
    {
      title: 'Page likes growth',
      value: facebook?.likeIncrease || 0,
      img: facebook?.profile || Profile,
      social: 'facebook',
      socialName: facebook?.name || 'Facebook name',
      socialInfo: [
        {
          sTitle: 'posts',
          sValue: facebook?.postCount || 0
        },
        {
          sTitle: 'page likes',
          sValue: facebook?.likeCount || 0
        }
      ],
      report: [
        {
          rTitle: 'overview',
          rTo: '/insights/facebook/overview'
        },
        {
          rTitle: 'posts',
          rTo: '/insights/facebook/posts'
        }
      ],
      link: '/insights/facebook/overview',
      growthReport: facebook?.report || [],
      connected: facebook !== null
    },
    {
      title: 'Follower growth',
      value: instagram?.followerIncrease || 0,
      img: instagram?.profile || Profile,
      social: 'instagram',
      socialName: instagram?.name || '@instagram_handle',
      socialInfo: [
        {
          sTitle: 'posts',
          sValue: instagram?.postCount || 0
        },
        {
          sTitle: 'following',
          sValue: instagram?.followingCount || 0
        },
        {
          sTitle: 'followers',
          sValue: instagram?.followerCount || 0
        }
      ],
      report: [
        {
          rTitle: 'overview',
          rTo: '/insights/instagram/overview'
        },
        {
          rTitle: 'posts',
          rTo: '/insights/instagram/posts'
        },
        {
          rTitle: 'stories',
          rTo: '/insights/instagram/stories'
        }
      ],
      link: '/insights/instagram/overview',
      growthReport: instagram?.report || [],
      connected: instagram !== null
    },
    {
      title: 'Connections growth',
      value: linkedIn?.followerIncrease || 0,
      img: linkedIn?.profile || Profile,
      social: 'linkedin',
      socialName: linkedIn?.name || 'LinkedIn Name',
      socialInfo: [
        {
          sTitle: 'posts',
          sValue: linkedIn?.postCount || 0
        },
        {
          sTitle: 'connections',
          sValue: linkedIn?.followerCount || 0
        }
      ],
      report: [
        {
          rTitle: 'overview',
          rTo: '/insights/linkedin/overview'
        },
        {
          rTitle: 'updates',
          rTo: '/insights/linkedin/posts'
        }
      ],
      link: '/insights/linkedin/overview',
      growthReport: linkedIn?.report || [],
      connected: linkedIn !== null
    },
    {
      title: 'Follower growth',
      value: 154,
      img: Profile,
      social: 'twitter',
      socialName: '@twitter_handle',
      socialInfo: [
        {
          sTitle: 'tweets',
          sValue: twitter?.report?.tweetCount || 0
        },
        {
          sTitle: 'following',
          sValue: twitter?.report?.followingCount || 0
        },
        {
          sTitle: 'followers',
          sValue: twitter?.report?.followersCount || 0
        }
      ],
      report: [
        {
          rTitle: 'overview',
          rTo: '/insights/twitter/overview'
        },
        {
          rTitle: 'tweets',
          rTo: '/insights/twitter/posts'
        }
      ],
      link: '/insights/twitter/overview',
      growthReport: twitter?.report?.followersReport || [],
      connected: twitter !== null
    }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      {facebook === null && instagram === null && twitter === null && linkedIn === null && (
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h3" component="div" sx={{ textAlign: 'center', width: '100%', padding: '30px 100px', lineHeight: 1.5 }}>
            It seems that you don&#39;t have any social accounts connected, please go to{' '}
            <Link to="/account/connectaccounts">Connect my accounts</Link> page to connect your accounts.
          </Typography>
        </Grid>
      )}

      {cardGraph.map((item: IGraphCard, index: number) => (
        <Fragment key={index}>
          {item.connected && (
            <Grid item xs={12} md={4}>
              <Link to={item.link} style={{ textDecoration: 'none' }}>
                <GraphCard {...item} dateRange={dateRange} />
              </Link>
            </Grid>
          )}
        </Fragment>
      ))}
    </Grid>
  );
};

export default MainInsights;
