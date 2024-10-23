/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import Chart, { Props as ChartProps } from 'react-apexcharts';

// material-ui
import { Box } from '@material-ui/core';

interface IFollowerGrowthMultiSeries {
  series?: {
    name: string;
    data:
      | number[]
      | {
          x: string;
          y: number;
        }[];
  }[];
  labels?: string[];
  title?: string;
}

const FollowerGrowthMultiSeries: FC<IFollowerGrowthMultiSeries> = ({ series = [], labels = [], title = 'Followers' }) => {
  // chart
  const chartData: ChartProps = {
    type: 'area',
    height: 387,
    options: {
      chart: {
        id: 'graph-chart',
        stacked: true,
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
      }
    },
    series
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Chart {...chartData} />
    </Box>
  );
};

export default FollowerGrowthMultiSeries;
