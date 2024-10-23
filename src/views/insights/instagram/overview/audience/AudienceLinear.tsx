/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import clsx from 'clsx';
import upperFirst from 'lodash/upperFirst';
import NumberFormat from 'react-number-format';
import { gridSpacing } from 'views/common/constant';

// material ui
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Box, Grid, LinearProgress, Typography, Skeleton } from '@material-ui/core';
import { AudienceFilter } from 'types';
import AudienceDonut from './AudienceDonut';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .apexcharts-legend-series': {
      width: '100%',
      margin: '4px !important'
    }
  },
  button: {
    padding: '5px 7.5px',
    color: '#000',
    borderRadius: '10px',
    border: 'unset',
    fontSize: '10px',
    cursor: 'pointer',
    background: '#fff',
    '&:hover': {
      background: '#ede7f6'
    },
    '&.active': {
      background: '#ede7f6'
    }
  }
}));

interface IAudienceLinear {
  color: string;
  activeItem: AudienceFilter;
  onChangeFilter: (type: AudienceFilter) => void;
  filters: {
    title: string;
    type: AudienceFilter;
  }[];
  values: {
    title: string;
    percentage: number;
  }[];
  loading?: boolean;
}

const AudienceLinear: FC<IAudienceLinear> = ({ color, filters, activeItem, values, loading, onChangeFilter }) => {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
      root: {
        height: 17,
        borderRadius: 10
      },
      colorPrimary: {
        backgroundColor: theme.palette.grey[200]
      },
      bar: {
        borderRadius: 5,
        backgroundColor: color
      }
    })
  )(LinearProgress);

  const genderSeries: number[] = [];
  const genderLabels: string[] = [];
  const total = values.reduce((acc, curr) => acc + curr.percentage, 0);

  if (activeItem === 'GENDER') {
    values.forEach((each) => {
      genderSeries.push(Math.round((each.percentage / total) * 100));
      genderLabels.push(upperFirst(each.title));
    });
  }

  return (
    <Grid container spacing={gridSpacing} className={classes.root}>
      <Grid item md={12}>
        <Box display="flex" alignItems="center">
          {filters.map((item) => (
            <button
              type="button"
              className={clsx(classes.button, activeItem === item.type && 'active')}
              key={item.type}
              onClick={() => onChangeFilter(item.type)}
            >
              {item.title}
            </button>
          ))}
        </Box>
      </Grid>
      <Grid item container xs={12} gap={2} sx={{ minHeight: 206 }}>
        {loading && (
          <>
            {[1, 2, 3].map((e) => (
              <Grid container alignItems="center" spacing={1} key={e}>
                <Grid item sm zeroMinWidth>
                  <Typography variant="subtitle1" sx={{ width: '30%' }}>
                    <Skeleton animation={false} />
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '100%' }}>
                    <Skeleton />
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </>
        )}
        {!loading && (
          <>
            {activeItem === 'GENDER' ? (
              <AudienceDonut title="GENDER" series={genderSeries} labels={genderLabels} />
            ) : (
              values.map((item: { title: string; percentage: number }, index: number) => {
                const percentageValue = Math.round((item.percentage / total) * 100);
                return (
                  <Grid container alignItems="center" spacing={1} key={`grid-${index}`}>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="subtitle1">{item.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" align="right">
                        <NumberFormat value={item.percentage} displayType="text" decimalScale={2} />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <BorderLinearProgress variant="determinate" value={percentageValue} />
                    </Grid>
                  </Grid>
                );
              })
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AudienceLinear;
