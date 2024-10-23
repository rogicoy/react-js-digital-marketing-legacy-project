/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { format } from 'date-fns';
import { ICampaignItem } from './interface';

// graphql
import { useLazyQuery, useQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// material-ui
import { Box, Typography, Grid } from '@material-ui/core';

// components
import CampaignBoxCard from 'ui-component/cards/Skeleton/CampaignBoxCard';
import CardList from './cards/CardList';
import DateRangePicker, { getDateRange, IDateRange, IDatePreset } from 'ui-component/date-range-picker';

// assets
import FbIcon from 'assets/images/icons/fb.png';
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import { gridSpacing } from 'views/common/constant';

import SocialAccount from 'views/account/socials/SocialAccount';
import ConnectPuzzleIcon from 'assets/images/pages/connect-puzzle.png';

const Campaigns: FC = () => {
  const [dateRange, setDateRange] = useState<{ value: IDatePreset; range: IDateRange }>({
    value: 'today',
    range: getDateRange('today')
  });
  // query
  const {
    query: { facebookAds, facebookCampaigns, facebookAdBrief }
  } = gql;

  // Account
  const { data: facebookAdAccountData } = useQuery(facebookAds, {
    fetchPolicy: 'network-only'
  });
  const facebookAdAccountActiveName = facebookAdAccountData?.facebookAds?.activeName;
  const facebookAdAccountDateConnected = facebookAdAccountData?.facebookAds?.dateConnected;

  // Active
  const [getActiveCampaigns, { data: fbActiveCampaignData, loading: fbActiveCampaignLoading }] = useLazyQuery<{
    facebookCampaigns: {
      data: ICampaignItem[];
    };
  }>(facebookCampaigns, { fetchPolicy: 'network-only' });
  const fbActiveCampaigns = fbActiveCampaignData?.facebookCampaigns?.data;

  // Completed
  const [getCompletedCampaigns, { data: fbCompletedCampaignData, loading: fbCompletedCampaignLoading }] = useLazyQuery<{
    facebookCampaigns: {
      data: ICampaignItem[];
    };
  }>(facebookCampaigns, { fetchPolicy: 'network-only' });
  const fbCompletedCampaigns = fbCompletedCampaignData?.facebookCampaigns?.data;

  // Archived
  const [getArchivedCampaigns, { data: fbArchivedCampaignData, loading: fbArchivedCampaignLoading }] = useLazyQuery<{
    facebookCampaigns: {
      data: ICampaignItem[];
    };
  }>(facebookCampaigns, { fetchPolicy: 'network-only' });
  const fbArchivedCampaigns = fbArchivedCampaignData?.facebookCampaigns?.data;

  // Archived
  const [getPrelaunchedCampaigns, { data: fbPrelaunchedCampaignData, loading: fbPrelaunchedCampaignLoading }] = useLazyQuery(
    facebookAdBrief,
    {
      fetchPolicy: 'network-only'
    }
  );
  const fbPrelaunchedCampaigns = fbPrelaunchedCampaignData?.facebookAdBrief?.data;

  const fetchData = () => {
    const { range } = dateRange;
    const from = range.from ? format(new Date(range.from), 'yyyy-MM-dd') : range.from;
    const to = range.to ? format(new Date(range.to), 'yyyy-MM-dd') : range.to;

    getActiveCampaigns({
      variables: {
        status: 'ACTIVE',
        paginator: {
          dateRange: {
            from,
            to
          }
        }
      }
    });
    getCompletedCampaigns({
      variables: {
        status: 'COMPLETED',
        paginator: {
          dateRange: {
            from,
            to
          }
        }
      }
    });
    getArchivedCampaigns({
      variables: {
        status: 'ARCHIVED',
        paginator: {
          dateRange: {
            from,
            to
          }
        }
      }
    });
    getPrelaunchedCampaigns({
      variables: {
        paginator: {
          dateRange: {
            from,
            to
          }
        }
      }
    });
  };

  const handleDateRangeChange = (value: IDatePreset, range: IDateRange) => {
    setDateRange({ value, range });
  };

  useEffect(() => {}, [facebookAdAccountDateConnected]);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  // memo data
  const memoFbData = useMemo(() => {
    const fbData: ICampaignItem[] = [];

    if (fbActiveCampaigns) {
      fbActiveCampaigns.forEach((item: ICampaignItem) => {
        fbData.push({
          ...item,
          social: 'facebook'
        });
      });
    }
    if (fbCompletedCampaigns) {
      fbCompletedCampaigns.forEach((item: ICampaignItem) => {
        fbData.push({
          ...item,
          social: 'facebook'
        });
      });
    }
    if (fbArchivedCampaigns) {
      fbArchivedCampaigns.forEach((item: ICampaignItem) => {
        fbData.push({
          ...item,
          social: 'facebook',
          status: 'ARCHIVED'
        });
      });
    }
    if (fbPrelaunchedCampaigns) {
      fbPrelaunchedCampaigns.forEach((item: any) => {
        fbData.push({
          ...item,
          social: 'facebook',
          status: 'IN_REVIEW',
          name: item.campaignName,
          end_date: item.endAt,
          spent: item.budget
        });
      });
    }

    return fbData
      .filter((item: ICampaignItem) => item.objective !== 'NONE')
      .sort((a: ICampaignItem, b: ICampaignItem) => +new Date(a.end_date) + +new Date(b.end_date));
  }, [fbActiveCampaigns, fbCompletedCampaigns, fbArchivedCampaigns, fbPrelaunchedCampaigns]);

  const prelaunchList = useMemo(() => memoFbData.filter((e) => e.status === 'IN_REVIEW'), [memoFbData]);
  const activeList = useMemo(() => memoFbData.filter((e) => e.status === 'ACTIVE'), [memoFbData]);
  const completedList = useMemo(() => memoFbData.filter((e) => e.status === 'COMPLETED'), [memoFbData]);
  const archivedList = useMemo(() => memoFbData.filter((e) => e.status === 'ARCHIVED'), [memoFbData]);

  if (!facebookAdAccountActiveName) {
    return (
      <MainCardCustom
        icon={
          <img
            src={ConnectPuzzleIcon}
            alt="Connect Puzzle icon"
            width={130}
            height={130}
            style={{ transform: 'rotate(-35deg)', marginTop: '30px', marginRight: '-12px' }}
          />
        }
        title="Campaigns"
        subTitle="Review your campaign drafts, reports and performance"
        sx={{
          background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
        }}
        action={
          <Box sx={{ width: '350px' }}>
            <SocialAccount
              name="Facebook Ads"
              description="Launch ads on Facebook and Instagram, and track their performance with our analytics."
              variant="connect"
              type="facebookAds"
              imgSrc={FbIcon}
            />
          </Box>
        }
        titleWhite
      />
    );
  }

  return (
    <MainCardCustom
      title="Campaigns"
      subTitle="Review your campaign drafts, reports and performance"
      sx={{
        background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
      }}
      titleWhite
      hasFloatingImages
      hideSmallFloatingImage
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <img src={FbIcon} alt={FbIcon} style={{ height: '45px', width: '45px' }} />
          <Typography variant="h3" sx={{ textTransform: 'capitalize', fontWeight: 'normal' }}>
            {facebookAdAccountActiveName}
          </Typography>
        </Box>
        <DateRangePicker value={dateRange.value} onChange={handleDateRangeChange} />
      </Box>

      {fbActiveCampaignLoading || fbCompletedCampaignLoading || fbArchivedCampaignLoading || fbPrelaunchedCampaignLoading ? (
        <Box sx={{ mt: 1 }} display="flex" justifyContent="center">
          <CampaignBoxCard />
        </Box>
      ) : (
        <Grid container spacing={6} sx={{ marginTop: '20px' }}>
          {prelaunchList.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} lg={3}>
                  <Typography variant="h3" gutterBottom sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    Pre Launch
                  </Typography>
                  <Typography variant="caption">These campaigns are in development with you and your account manager.</Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <CardList list={prelaunchList} />
                </Grid>
              </Grid>
            </Grid>
          )}

          {activeList.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} lg={3}>
                  <Typography variant="h3" gutterBottom sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    Active Campaigns
                  </Typography>
                  <Typography variant="caption">Active campaigns are live right now.</Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <CardList list={activeList} />
                </Grid>
              </Grid>
            </Grid>
          )}

          {completedList.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} lg={3}>
                  <Typography variant="h3" gutterBottom sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    Completed Campaigns
                  </Typography>
                  <Typography variant="caption">These campaigns are wrapped! View their reports to see how they performed.</Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <CardList list={completedList} />
                </Grid>
              </Grid>
            </Grid>
          )}

          {archivedList.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} lg={3}>
                  <Typography variant="h3" gutterBottom sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    Archived Campaigns
                  </Typography>
                  <Typography variant="caption">
                    These campaigns you&apos;ve run prior to connecting your ad account with REMOVED. We can only display limited analytics
                    for these campaigns.
                  </Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <CardList list={archivedList} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
      <Outlet />
    </MainCardCustom>
  );
};

export default Campaigns;
