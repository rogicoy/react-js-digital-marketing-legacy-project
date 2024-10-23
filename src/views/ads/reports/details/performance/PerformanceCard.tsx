/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { IPerformanceCard, IPerformanceItems } from '../interface';

// material-ui
import { Grid, Box, Typography, Divider } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ExportButton from 'views/common/components/ExportButton';

// assets
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const PerformanceCard: FC<IPerformanceCard> = ({ impressions, frequency, cpc, ctr }) => {
  const items: Array<IPerformanceItems> = [
    {
      title: 'Impressions',
      subTitle: 'How many times your content was displayed on a screen',
      value: impressions.value,
      percentage: 0.24,
      increase: impressions.increase
    },
    {
      title: 'Frequency',
      subTitle: 'The average number of times each person saw your ad',
      value: frequency.value,
      percentage: 0.24,
      increase: frequency.increase
    },
    {
      title: 'CTC',
      subTitle: 'Cost per click',
      value: cpc.value,
      percentage: 0.24,
      increase: cpc.increase
    },
    {
      title: 'CTR',
      subTitle: 'The percentage of times people saw your ad and clicked a link',
      value: ctr.value,
      percentage: 0.24,
      suffix: '%',
      increase: ctr.increase
    }
  ];

  return (
    <MainCard sx={{ position: 'relative', '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ position: 'absolute', right: 0 }}>
        <ExportButton />
      </Box>
      <Box sx={{ py: 2 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ px: 2 }} variant="h3">
              Performance Metrics
            </Typography>
          </Grid>
          <Grid item zeroMinWidth>
            <Divider />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 2, pt: 1, pb: 3 }}>
        <Grid container direction="column" spacing={2}>
          {items.map((item: IPerformanceItems, index: number, array: Array<IPerformanceItems>) => {
            const increase = item.increase.includes('-');
            const value = increase ? item.increase.split('-') : item.increase;
            const up = Array.isArray(value) ? '-' : '+';
            const percentage = Array.isArray(value) ? value[1] : value;

            return (
              <Fragment key={index}>
                <Grid item>
                  <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item xs>
                      <Typography sx={{ fontSize: '1.25rem', color: 'black' }}>{item.title}</Typography>
                      <Typography variant="subtitle2" width="85%">
                        {item.subTitle}
                      </Typography>
                    </Grid>
                    <Grid item justifyContent="end">
                      <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>
                        <NumberFormat suffix={item.suffix} prefix={item.prefix} value={item.value} displayType="text" thousandSeparator />
                      </Typography>
                    </Grid>
                    <Grid item justifyContent="end">
                      {up === '+' ? (
                        <ArrowUpwardIcon fontSize="small" color="success" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" color="error" />
                      )}
                    </Grid>
                    <Grid item justifyContent="end">
                      <Typography sx={{ fontSize: '1rem', color: up === '+' ? 'success.main' : 'error.main' }}>
                        <NumberFormat
                          value={percentage || 0}
                          prefix={up}
                          suffix="%"
                          displayType="text"
                          decimalScale={2}
                          thousandSeparator
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* remove last divider */}
                {array.length - 1 !== index && (
                  <Grid item>
                    <Divider />
                  </Grid>
                )}
              </Fragment>
            );
          })}
        </Grid>
      </Box>
    </MainCard>
  );
};

export default PerformanceCard;
