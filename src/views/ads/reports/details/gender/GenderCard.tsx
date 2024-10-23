/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useMemo, useState, FC } from 'react';
import NumberFormat from 'react-number-format';
import helpers from 'utils/helpers';
import { IActiveBreakdown, IButtonBreakdown, IFacebookAdResultBreakdown, IFacebookAdResultBreakdownArray } from '../interface';
import { TGenderBreakdown } from '../type';

// graphql
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Divider, Theme, Button } from '@material-ui/core';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ExportButton from 'views/common/components/ExportButton';
import SimpleSkeletonCard from 'ui-component/cards/Skeleton/SimpleSkeletonCard';
import { IDatePreset, IDateRange } from 'ui-component/date-range-picker';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  chartBox: {},
  button: {
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5
  }
}));

// constant
const breakdownButtons: Array<IButtonBreakdown> = [
  {
    breakdown: 'clicks',
    label: 'Clicks'
  },
  {
    breakdown: 'impressions',
    label: 'Impressions'
  },
  {
    breakdown: 'ctr',
    label: 'CTR'
  },
  {
    breakdown: 'spend',
    label: 'Spend'
  }
];

const GenderCard: FC<{ campaignId: string | undefined; dateRange: { value: IDatePreset; range: IDateRange } }> = ({
  campaignId,
  dateRange
}) => {
  // styles
  const classes = useStyles();

  // states
  const [active, setActive] = useState<TGenderBreakdown>('clicks');

  // query
  const {
    query: { facebookAdResultBreakdown }
  } = gql;

  const [getFbResultBreakdown, { data, loading }] = useLazyQuery<{
    facebookAdResultBreakdown: IFacebookAdResultBreakdown[];
  }>(facebookAdResultBreakdown, {
    fetchPolicy: 'network-only'
  });
  const fbAdResultBreakdown = data?.facebookAdResultBreakdown;

  useEffect(() => {
    if (campaignId) {
      getFbResultBreakdown({
        variables: {
          input: {
            campaignId,
            breakdown: 'gender',
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
  }, [campaignId, dateRange, getFbResultBreakdown]);

  const memoAdsResultsBreakdown = useMemo(() => {
    const adsResultsBreakdown: IFacebookAdResultBreakdownArray = {
      breakdown: [],
      spend: [],
      impressions: [],
      ctr: [],
      clicks: []
    };

    if (fbAdResultBreakdown) {
      const { breakdown, spend, impressions, ctr, clicks } = adsResultsBreakdown;

      fbAdResultBreakdown.forEach((item: IFacebookAdResultBreakdown) => {
        breakdown.push(item.breakdown);
        spend.push(+item.spend);
        impressions.push(+item.impressions);
        ctr.push(+item.ctr);
        clicks.push(+item.clicks);
      });
    }

    return adsResultsBreakdown;
  }, [fbAdResultBreakdown]);

  const getActive = ({ breakdown }: { breakdown: TGenderBreakdown }) => {
    const seriesBreakdown: Array<IActiveBreakdown> = [
      {
        breakdown: 'spend',
        value: memoAdsResultsBreakdown.spend
      },
      {
        breakdown: 'impressions',
        value: memoAdsResultsBreakdown.impressions
      },
      {
        breakdown: 'ctr',
        value: memoAdsResultsBreakdown.ctr
      },
      {
        breakdown: 'clicks',
        value: memoAdsResultsBreakdown.clicks
      }
    ];

    const series = seriesBreakdown.find((item: IActiveBreakdown) => item.breakdown === breakdown);

    return series?.value;
  };

  const genderChartData: ChartProps = {
    type: 'donut',
    height: 250,
    options: {
      chart: {
        id: 'gender'
      },
      dataLabels: {
        enabled: false
      },
      labels: memoAdsResultsBreakdown.breakdown,
      legend: {
        show: false,
        position: 'bottom'
      },
      colors: ['#FFAB91', '#9618F7', '#90CAF9'],
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      }
    },
    series: getActive({ breakdown: active })
  };

  return (
    <MainCard sx={{ height: '100%', position: 'relative', '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ position: 'absolute', right: 0 }}>
        <ExportButton />
      </Box>
      <Box sx={{ py: 2 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ px: 2 }} variant="h3">
              Gender
            </Typography>
          </Grid>
          <Grid item zeroMinWidth>
            <Divider />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          px: 2,
          pb: 3,
          pt: 0
        }}
        className={classes.chartBox}
      >
        {loading ? (
          <SimpleSkeletonCard />
        ) : (
          <Grid container direction="column" spacing={3}>
            <Grid item spacing={2} display="flex" justifyContent="space-between">
              {breakdownButtons.map((item: IButtonBreakdown, index: number) => (
                <Button
                  type="button"
                  variant={active === item.breakdown ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setActive(item.breakdown)}
                  className={classes.button}
                >
                  {item.label}
                </Button>
              ))}
            </Grid>
            <Grid item>
              <Chart {...genderChartData} />
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2} sx={{ px: 3 }}>
                {genderChartData.options?.labels?.map((label, index) => (
                  <Grid item key={label}>
                    <Grid container justifyContent="space-between" spacing={1}>
                      <Grid item>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              mr: 1,
                              width: 12,
                              height: 12,
                              backgroundColor: genderChartData.options?.colors?.[index],
                              borderRadius: '25%'
                            }}
                          />
                          <Typography sx={{ fontSize: 12 }}>{label}</Typography>
                        </Box>
                      </Grid>

                      <Grid item>
                        <Typography sx={{ fontSize: 12 }}>
                          <NumberFormat
                            value={helpers.addDecimalZero(genderChartData.series?.[index])}
                            displayType="text"
                            thousandSeparator
                            decimalScale={2}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </MainCard>
  );
};

export default GenderCard;
