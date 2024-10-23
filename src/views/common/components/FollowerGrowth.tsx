/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import Chart, { Props as ChartProps } from 'react-apexcharts';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardContent, Box } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%'
  },
  content: {
    padding: '0px !important'
  },
  contentContainer: {
    padding: '16px !important',
    paddingBottom: 0,
    color: '#fff'
  }
}));

interface IFollowerGrowth {
  totalFollowers?: number;
  data?: number[];
  labels?: string[];
  title?: string;
}

const FollowerGrowth: FC<IFollowerGrowth> = ({ totalFollowers = 0, data = [], labels = [], title = 'Followers' }) => {
  const classes = useStyles();

  // chart
  const chartData: ChartProps = {
    type: 'area',
    height: 387,
    options: {
      chart: {
        id: 'graph-chart',
        sparkline: {
          enabled: true
        },
        background: '#fff'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#9618f7'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: true
        },
        marker: {
          show: false
        }
      },
      labels
    },
    series: [
      {
        name: title,
        data
      }
    ]
  };

  return (
    <Card className={classes.card} sx={{ position: 'relative' }}>
      <CardContent className={classes.content}>
        <Grid container className={classes.contentContainer}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h2">{title}</Typography>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h2">{totalFollowers}</Typography>
                  <Typography variant="subtitle1">Total {title}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Chart {...chartData} />
      </CardContent>
    </Card>
  );
};

export default FollowerGrowth;
