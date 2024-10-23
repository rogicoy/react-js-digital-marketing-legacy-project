/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';
import { IDailyReport, IFacebookAdResultRange } from '../interface';

// material-ui
import { Grid, Box, Typography, Divider, CircularProgress } from '@material-ui/core';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ExportButton from 'views/common/components/ExportButton';
// import { endOfMonth, format, startOfMonth, subDays, subMonths } from 'date-fns';
import { IDatePreset, IDateRange } from 'ui-component/date-range-picker';

const EngagementCard: FC<{ campaignId: string | undefined; dateRange: { value: IDatePreset; range: IDateRange } }> = ({
  campaignId,
  dateRange
}) => {
  // query
  const {
    query: { facebookAdResultRange }
  } = gql;

  const [getFbAdResultRange, { data, loading }] = useLazyQuery<{
    facebookAdResultRange: IFacebookAdResultRange;
  }>(facebookAdResultRange, {
    fetchPolicy: 'network-only'
  });
  const fbAdResultRangeDetails = data?.facebookAdResultRange;

  useEffect(() => {
    if (campaignId) {
      getFbAdResultRange({
        variables: {
          input: {
            campaignId,
            dateRange: {
              from: dateRange.range.fromFormatted,
              to: dateRange.range.toFormatted
            }
          }
        }
      });
    }
  }, [campaignId, dateRange, getFbAdResultRange]);

  const memoAdsResultsRange = useMemo(() => {
    const adsResultsRange: {
      frequency: Array<number>;
      impressions: Array<number>;
      reach: Array<number>;
      max: number;
    } = {
      frequency: [],
      impressions: [],
      reach: [],
      max: 1000
    };

    if (facebookAdResultRange && facebookAdResultRange !== null) {
      const { frequency, impressions, reach } = adsResultsRange;

      // need to sort date for consistency of graph
      fbAdResultRangeDetails?.impressions
        .sort((a: IDailyReport, b: IDailyReport) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .forEach((item: IDailyReport) => impressions.push(item.count));
      fbAdResultRangeDetails?.frequency
        .sort((a: IDailyReport, b: IDailyReport) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .forEach((item: IDailyReport) => frequency.push(item.count));
      fbAdResultRangeDetails?.reach
        .sort((a: IDailyReport, b: IDailyReport) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .forEach((item: IDailyReport) => reach.push(item.count));

      const maxNumber = [Math.max(...impressions), Math.max(...frequency), Math.max(...reach)];
      adsResultsRange.max = Math.max(...maxNumber) + 400;
    }

    return adsResultsRange;
  }, [fbAdResultRangeDetails]);

  const engagementChartData: ChartProps = {
    height: 350,
    type: 'area',
    options: {
      chart: {
        id: 'engagement-overview',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 80, 100]
        }
      },
      legend: {
        show: true,
        position: 'top',
        offsetY: 0,
        fontSize: '16px'
      },
      yaxis: {
        min: 1,
        // @TODO max: !isFinite(memoAdsResultsRange.max) ? memoAdsResultsRange.max : 100,
        max: memoAdsResultsRange.max + 800,
        labels: {
          show: false
        }
      },
      colors: ['#9618F7', '#7F66EB', '#FFAB91']
    },
    series: [
      {
        name: 'Impressions',
        data: memoAdsResultsRange.impressions
      },
      {
        name: 'Frequency',
        data: memoAdsResultsRange.frequency
      },
      {
        name: 'Reach',
        data: memoAdsResultsRange.reach
      }
    ]
  };

  return (
    <MainCard
      sx={{
        height: '100%',
        position: 'relative',
        '&>div': { p: 0, pb: '0px !important' }
      }}
    >
      <Box sx={{ position: 'absolute', right: 0 }}>
        <ExportButton />
      </Box>
      <Box sx={{ py: 2 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ px: 2 }} variant="h3">
              Performance Overview
            </Typography>
          </Grid>
          <Grid item zeroMinWidth>
            <Divider />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Chart {...engagementChartData} />
        )}
      </Box>
    </MainCard>
  );
};

export default EngagementCard;
