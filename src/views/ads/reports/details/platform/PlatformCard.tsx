/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Divider, Theme } from '@material-ui/core';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ExportButton from 'views/common/components/ExportButton';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  chartBox: {
    '& .apexcharts-datalabel-value': {
      fontFamily: 'inherit',
      fontSize: '1rem',
      color: '#000',
      fill: '#000'
    }
  }
}));

interface IPlatformCard {
  data: any[];
}

const PlatformCard: React.FC<IPlatformCard> = ({ data = [] }) => {
  const classes = useStyles();
  const chartDataList: ChartProps[] = data.map((item) => ({
    type: 'donut',
    width: '100%',
    options: {
      chart: {
        id: item.title
      },
      dataLabels: {
        enabled: false
      },
      labels: item.labels,
      legend: {
        show: false,
        position: 'bottom'
      },
      colors: ['#1565C0', '#EF5DA8'],
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                offsetY: -10
              },
              total: {
                show: true,
                label: '',
                formatter: () => item.title
              }
            }
          }
        }
      }
    },
    series: item.series
  }));

  return (
    <MainCard sx={{ height: '100%', position: 'relative', '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ position: 'absolute', right: 0 }}>
        <ExportButton />
      </Box>
      <Box
        sx={{
          py: 2
        }}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h3" sx={{ mx: 2 }}>
              Platform
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              {chartDataList.map((chartData, index) => (
                <Grid item key={index} xs={2}>
                  <Chart {...chartData} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={6} sx={{ px: 3 }}>
              {chartDataList?.[0]?.options?.labels?.map((label, index) => (
                <Grid item key={label}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        mr: 1,
                        width: 16,
                        height: 16,
                        backgroundColor: chartDataList?.[0]?.options?.colors?.[index],
                        borderRadius: '50%'
                      }}
                    />
                    <Typography sx={{ fontSize: '1rem' }}>{label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default PlatformCard;
