/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import NumberFormat from 'react-number-format';
import Chart, { Props as ChartProps } from 'react-apexcharts';
import { IAudienceChart } from 'views/insights/interface';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  mainCard: {
    border: '1px solid #ffffff',
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  },
  box: {
    textAlign: 'center'
  },
  contentRoot: {
    padding: '16px'
  },
  card: {
    border: '1px solid #808080'
  },
  content: {
    padding: '0px !important'
  },
  contentContainer: {
    padding: '16px !important',
    paddingBottom: 0,
    color: '#fff'
  },
  fontStyle: {
    fontWeight: 400
  },
  boxButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0
  },
  typography: {
    color: '#9e9e9e',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    '&.active': {
      color: '#9618f7'
    },
    '&:hover': {
      color: '#9618f7'
    }
  }
}));

const AudienceChart: FC<IAudienceChart> = ({ title, value, color }) => {
  const classes = useStyles();

  const chartData: ChartProps = {
    type: 'area',
    height: 100,
    options: {
      chart: {
        id: 'audience-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [color],
      fill: {
        colors: ['#fff']
      },
      stroke: {
        colors: ['#fff'],
        curve: 'smooth',
        width: 2
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        name: title,
        data: [10, 45, 15, 20, 8]
      }
    ]
  };

  return (
    <Card className={classes.card} sx={{ backgroundColor: color }}>
      <CardContent className={classes.content}>
        <Grid container className={classes.contentContainer}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'normal', maxWidth: '150px' }}>
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2" sx={{ color: '#fff' }}>
                  <NumberFormat value={value} displayType="text" thousandSeparator />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Chart {...chartData} />
      </CardContent>
    </Card>
  );
};

export default AudienceChart;
