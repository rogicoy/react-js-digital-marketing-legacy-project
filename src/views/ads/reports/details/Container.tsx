/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useLocation, useParams } from 'react-router-dom';
import helpers from 'utils/helpers';
import { IFacebookAdResult } from './interface';

// graphql
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// material-ui
import { Box, Button, Typography, Grid } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import { ISocialType } from 'types';
import { gridSpacing } from 'views/common/constant';
import TotalAddSpend from './statistics/TotalAddSpend';
import TotalResults from './statistics/TotalResults';
import CostPerResult from './statistics/CostPerResult';
import EngagementCard from './engagement/EngagementCard';
import PerformanceCard from './performance/PerformanceCard';
import GenderCard from './gender/GenderCard';
import AgeCard from './age/AgeCard';
import LocationCard from './location/LocationCard';
import LineChartCard, { IPLineChartCard } from './line-chart/LineChartCard';
import DateRangePicker, { getDateRange, IDatePreset, IDateRange } from 'ui-component/date-range-picker';

const ReportDetails: FC = () => {
  // router props
  const params = useParams();
  const location = useLocation();
  const state = location?.state as { social?: ISocialType } | null;

  // states
  const [lastCollectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<{ value: IDatePreset; range: IDateRange }>({
    value: 'today',
    range: getDateRange('today')
  });

  // query
  const {
    query: { facebookAdResult }
  } = gql;

  const [getFacebookAdResult, { data: fbAdsData, loading: fbAdsLoading }] = useLazyQuery<{
    facebookAdResult: IFacebookAdResult;
  }>(facebookAdResult, { fetchPolicy: 'network-only' });
  const fbAdDetails = fbAdsData?.facebookAdResult;

  // line chart data for google
  const lineChartData: Array<IPLineChartCard> = [
    {
      data: [20, 10, 18, 12, 25, 10, 20],
      title: 'Impressions',
      value: 1563,
      percentage: -0.24,
      up: false
    },
    {
      data: [29, 15, 2, 21, 18, 21, 22],
      title: 'Clicks',
      value: 345,
      percentage: -0.24,
      up: true
    },
    {
      data: [15, 21, 5, 21, 15, 9, 4],
      title: 'Click through rate',
      value: 57,
      percentage: -0.24,
      up: false,
      suffix: '%'
    },
    {
      data: [5, 9, 2, 23, 24, 10, 22],
      title: 'Cost per click',
      value: 34,
      percentage: -0.24,
      up: true,
      prefix: '$'
    }
  ];

  // memo data
  const memoFbAdsResult = useMemo(() => {
    let fbAdsResult: IFacebookAdResult = {
      name: '',
      status: '',
      objective: '',
      spend: {
        value: 0,
        increase: '-'
      },
      leads: {
        value: 0,
        increase: '-'
      },
      costPerLead: {
        value: 0,
        increase: '-'
      },
      impressions: {
        value: 0,
        increase: '-'
      },
      frequency: {
        value: 0,
        increase: '-'
      },
      cpc: {
        value: 0,
        increase: '-'
      },
      ctr: {
        value: 0,
        increase: '-'
      },
      reach: {
        value: 0,
        increase: '-'
      },
      clicks: {
        value: 0,
        increase: '-'
      },
      platform: 'FACEBOOK'
    };

    if (fbAdDetails) fbAdsResult = fbAdDetails;

    return fbAdsResult;
  }, [fbAdDetails]);

  useEffect(() => {
    // @TODO: if (params.adInputId && memoFbAdsResult.platform === 'FACEBOOK') {
    if (params.adInputId) {
      getFacebookAdResult({
        variables: {
          input: {
            campaignId: params.adInputId,
            paginator: {
              dateRange: {
                from: dateRange.range.fromFormatted,
                to: dateRange.range.toFormatted
              }
            }
          }
        }
      });
    }
  }, [params.adInputId, dateRange]);

  const handleDateRangeChange = (value: IDatePreset, range: IDateRange) => {
    setDateRange({ value, range });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Reports" secondary={<DateRangePicker value={dateRange.value} onChange={handleDateRangeChange} />}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ mr: 1, textTransform: 'capitalize' }}>
                  {memoFbAdsResult.name}
                </Typography>
                <Chip
                  size="small"
                  label={helpers.textLowerCase(memoFbAdsResult.status)}
                  chipcolor="success"
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
              <Typography variant="h3" sx={{ mr: 1, mb: 2 }}>
                {`${dateRange.range?.from ? format(dateRange.range?.from, 'do LLLL YYY') : ''} - ${
                  dateRange.range?.to ? format(dateRange.range.to, 'do LLLL YYY') : ''
                }`}
              </Typography>
              <Typography variant="caption">Data last collected: {format(lastCollectedDate, 'do LLLL, h.mmaaa')}</Typography>
            </div>

            <div>
              <Button disableElevation variant="contained">
                Export Report
              </Button>
            </div>
          </Box>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={4}>
            <TotalAddSpend performance={memoFbAdsResult.spend} isLoading={fbAdsLoading} />
          </Grid>
          <Grid item xs={4}>
            <TotalResults performance={memoFbAdsResult.leads} isLoading={fbAdsLoading} objective={memoFbAdsResult.objective} />
          </Grid>
          <Grid item xs={4}>
            <CostPerResult performance={memoFbAdsResult.costPerLead} isLoading={fbAdsLoading} objective={memoFbAdsResult.objective} />
          </Grid>
        </Grid>
      </Grid>

      {/* === check social via state or data === */}
      {memoFbAdsResult.platform === 'FACEBOOK' && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={8}>
                <EngagementCard campaignId={params?.adInputId} dateRange={dateRange} />
              </Grid>
              <Grid item xs={4}>
                <PerformanceCard
                  impressions={memoFbAdsResult.impressions}
                  frequency={memoFbAdsResult.frequency}
                  cpc={memoFbAdsResult.cpc}
                  ctr={memoFbAdsResult.ctr}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={4}>
                <GenderCard campaignId={params?.adInputId} dateRange={dateRange} />
              </Grid>
              <Grid item xs={4}>
                <AgeCard campaignId={params?.adInputId} dateRange={dateRange} />
              </Grid>
              <Grid item xs={4}>
                <LocationCard campaignId={params?.adInputId} dateRange={dateRange} />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}

      {state?.social === 'google' && (
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {lineChartData.map((item: IPLineChartCard, index: number) => (
              <Grid item xs={3} key={`chart-${index}`}>
                <LineChartCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ReportDetails;
