/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// project imports
import MainCard from './MainCard';

// =============================|| SEO CHART CARD ||============================= //

export interface SeoChartCardProps {
  chartData: ChartProps;
  value?: string | number;
  title?: string;
  icon?: React.ReactNode | string;
  type?: number;
}

const SeoChartCard = ({ chartData, value, title, icon, type }: SeoChartCardProps) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MainCard>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12}>
          <Grid container direction={type === 1 ? 'column-reverse' : 'column'} spacing={type === 1 ? 0 : 1}>
            {value && (
              <Grid item>
                <Typography variant={matchDownMd ? 'h4' : 'h3'}>{value}</Typography>
              </Grid>
            )}
            {(title || icon) && (
              <Grid item container justifyContent="flex-start" alignContent="center">
                {title && <Typography variant="body1">{title}</Typography>}
                {icon && (
                  <Box
                    sx={{
                      ml: 1
                    }}
                  >
                    {icon}
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        {chartData && (
          <Grid item xs={12}>
            <Chart {...chartData} />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default SeoChartCard;
