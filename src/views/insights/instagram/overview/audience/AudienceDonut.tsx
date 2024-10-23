/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import Chart, { Props as ChartProps } from 'react-apexcharts';

interface IAudienceDonut {
  title: string;
  series: number[];
  labels: string[];
}

const AudienceDonut: FC<IAudienceDonut> = ({ title, series, labels }) => {
  const chartData: ChartProps = {
    width: '100%',
    height: 400,
    type: 'donut',
    series,
    colors: ['#FFAB91', '#90CAF9', '#9618F7', '#FF4560', '#FEB019'],
    options: {
      chart: {
        id: 'audience-chart'
      },
      labels,
      colors: ['#FFAB91', '#90CAF9', '#9618F7', '#FF4560', '#FEB019'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        formatter(seriesName, opts) {
          return `<span><span>${seriesName}</span> <span style="float: right;">${opts.w.globals.series[opts.seriesIndex]}%</span></span>`;
        }
      },
      dataLabels: {
        enabled: false
      }
    }
  };

  return <Chart {...chartData} />;
};

export default AudienceDonut;
