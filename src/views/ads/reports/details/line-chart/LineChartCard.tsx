/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import NumberFormat from 'react-number-format';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Box, Theme, Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  boxContent: {
    padding: theme.spacing(5, 3)
  }
}));

// interface
export interface IPLineChartCard {
  data: Array<number>;
  title: string;
  up: boolean;
  value: number;
  percentage: number;
  suffix?: string;
  prefix?: string;
}

const LineChartCard: FC<IPLineChartCard> = ({ data, title, up, value, percentage, prefix, suffix }) => {
  const classes = useStyles();

  // chart data
  const chartData: ChartProps = {
    type: 'line',
    height: 100,
    options: {
      chart: {
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#9618f7'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      yaxis: {
        min: 0,
        max: 30
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: (seriesName: string) => `Total ${seriesName}`
          }
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        name: title,
        data
      }
    ]
  };

  return (
    <MainCard
      sx={{
        height: '100%',
        position: 'relative',
        '&>div': { p: 0, pb: 1 }
      }}
    >
      <Box className={classes.boxContent}>
        <Grid container direction="column">
          <Grid item>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography sx={{ color: 'black' }} variant="h2">
                  <NumberFormat value={value} displayType="text" decimalScale={2} prefix={prefix} suffix={suffix} thousandSeparator />
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                {up ? <ArrowUpwardIcon fontSize="small" color="success" /> : <ArrowDownwardIcon fontSize="small" color="error" />}
                <Typography sx={{ ml: 1, color: up ? 'success.main' : 'error.main' }}>
                  <NumberFormat suffix="%" value={percentage} displayType="text" decimalScale={2} />
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Chart {...chartData} />
      </Box>
    </MainCard>
  );
};

export default LineChartCard;
