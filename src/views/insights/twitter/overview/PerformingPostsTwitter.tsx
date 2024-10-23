/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { IPerformingPosts } from 'types';
import { gridSpacing } from 'views/common/constant';
import { ILikePosts } from 'views/insights/interface';

// material ui
import { Box, Grid, Theme, Typography, Skeleton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// components
import MainCard from 'ui-component/cards/MainCard';

// assets
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { useLazyQuery } from '@apollo/client';
import gql from 'store/insights/gql';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    height: '66px'
  },
  button: {
    padding: '5px 20px',
    color: '#000',
    borderRadius: '20px',
    border: 'unset',
    fontSize: '15px',
    cursor: 'pointer',
    marginRight: '10px',
    background: '#fff',
    '&:hover': {
      background: '#ede7f6'
    },
    '&.active': {
      background: '#ede7f6'
    }
  }
}));

type FilterType = 'likeCount' | 'replyCount' | 'retweetCount';

const PerformingPostsTwitter: FC<IPerformingPosts> = ({ mainTitle }) => {
  const classes = useStyles();

  const [activeItem, setActiveItem] = useState<FilterType>('likeCount');

  const [getTwitterTweetsLazy, { data: twitterTweetsData, loading: twitterTweetsLoading }] = useLazyQuery(gql.query.twitterTweets, {
    fetchPolicy: 'network-only'
  });
  const twitterTweets = twitterTweetsData?.twitterTweets;

  const topPostsData: ILikePosts[] = useMemo(
    () =>
      twitterTweets?.data?.map(
        (e: any): ILikePosts => ({
          image: e.url,
          date: new Date(e.postDate),
          caption: e.caption,
          like: e.likeCount,
          comment: e.replyCount,
          share: e.engageCount,
          save: e.retweetCount
        })
      ) || [],
    [twitterTweets]
  );

  useEffect(() => {
    getTwitterTweetsLazy({
      variables: {
        input: {
          order: activeItem,
          limit: 5
        }
      }
    });
  }, [activeItem]);

  const performingButtons: {
    title: string;
    type: FilterType;
  }[] = [
    {
      title: 'Likes',
      type: 'likeCount'
    },
    {
      title: 'Comments',
      type: 'replyCount'
    },
    {
      title: 'Retweets',
      type: 'retweetCount'
    }
  ];

  const handleActiveItem = (type: FilterType) => {
    setActiveItem(type);
  };

  return (
    <MainCard
      title={mainTitle}
      secondary={
        <Button to="/insights/twitter/posts" component={RouterLink}>
          View detailed post report
        </Button>
      }
      defaultSizeTitle
    >
      <Grid container spacing={gridSpacing}>
        <Grid item md={12}>
          {performingButtons.map((item) => (
            <button
              type="button"
              className={clsx(classes.button, activeItem === item.type && 'active')}
              key={item.type}
              onClick={() => handleActiveItem(item.type)}
            >
              {item.title}
            </button>
          ))}
        </Grid>
        <Grid item container md={12} gap={3}>
          {twitterTweetsLoading ? (
            <>
              {[1, 2, 3, 4].map((item, index) => (
                <Grid item xs={12} md key={index}>
                  <Typography variant="h3" mb={2}>
                    {index + 1}
                  </Typography>
                  <Box mb={2}>
                    <Skeleton variant="rectangular" height={180} />
                  </Box>
                  <Typography variant="subtitle1" mb={1}>
                    <Skeleton width="60%" />
                  </Typography>
                  <Typography variant="body2" className={classes.lineClamp}>
                    <Skeleton width="80%" />
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <Skeleton variant="rectangular" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <Skeleton variant="rectangular" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <Skeleton variant="rectangular" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <Skeleton variant="rectangular" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          ) : (
            <>
              {topPostsData.map((item: ILikePosts, index: number) => (
                <Grid item xs={12} md key={index}>
                  <Typography variant="h3" mb={2}>
                    {index + 1}
                  </Typography>
                  <Box mb={1} sx={{ height: 180 }}>
                    <img src={item.image} alt="Post" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="subtitle1" mb={1}>
                    {format(item.date, 'do LLL yyy')}
                  </Typography>
                  <Typography variant="body2" mb={1.5} className={classes.lineClamp}>
                    {item.caption}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <ThumbUpOutlinedIcon htmlColor="#000" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">{item.like}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <SmsOutlinedIcon htmlColor="#000" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">{item.comment}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box pr={0.5}>
                        <TelegramIcon htmlColor="#000" sx={{ width: '15px', height: '15px' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">{item.share}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default PerformingPostsTwitter;
