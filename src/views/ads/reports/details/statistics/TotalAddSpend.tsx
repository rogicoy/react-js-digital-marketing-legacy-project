/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, Typography, Box } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ExportButton from 'views/common/components/ExportButton';

// assets
import BubbleImage from 'assets/images/pages/bubble.png';
import { gridSpacing } from 'views/common/constant';
import NumberFormat from 'react-number-format';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IPerformanceValue } from '../interface';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: theme.palette.deepPurple[400],
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '210px',
      height: '210px',

      borderRadius: '50%',
      top: '-85px',
      right: '-95px',
      [theme.breakpoints.down('xs')]: {
        top: '-105px',
        right: '-140px'
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '210px',
      height: '210px',
      borderRadius: '50%',
      top: '-125px',
      right: '-15px',
      opacity: 0.5,
      [theme.breakpoints.down('xs')]: {
        top: '-155px',
        right: '-70px'
      }
    }
  },
  content: {
    padding: theme.spacing(6, 3)
  },
  bubbleBox: {
    position: 'absolute',
    width: '70%',
    top: 0,
    right: 0
  },
  bubbleImage: {
    width: '100%'
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary[800],
    marginTop: '8px'
  },
  cardHeading: {
    fontSize: '2.125rem',
    fontWeight: 500,
    marginRight: '8px',
    marginTop: '14px',
    marginBottom: '6px'
  },
  subHeading: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: theme.palette.deepPurple[50]
  },

  avatarCircle: {
    cursor: 'pointer',
    ...theme.typography.smallAvatar,
    backgroundColor: theme.palette.secondary[200],
    color: theme.palette.secondary.dark
  },
  circleIcon: {
    transform: 'rotate3d(1, 1, 1, 45deg)'
  }
}));

export interface TotalAddSpendProps {
  performance: IPerformanceValue;
  isLoading?: boolean;
}

const TotalAddSpend: FC<TotalAddSpendProps> = ({ performance, isLoading }) => {
  const classes = useStyles();

  const increase = performance.increase.includes('-');
  const value = increase ? performance.increase.split('-') : performance.increase;
  const up = Array.isArray(value) ? '-' : '+';
  const percentage = Array.isArray(value) ? value[1] : value;

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard border={false} className={classes.card} contentClass={classes.content}>
          <Box className={classes.bubbleBox}>
            <img src={BubbleImage} alt="bubble icon" className={classes.bubbleImage} />
          </Box>
          <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
            <ExportButton color="#fff" />
          </Box>

          <Grid container direction="column" sx={{ mt: gridSpacing }}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    <NumberFormat prefix="$" value={performance.value} displayType="text" decimalScale={2} thousandSeparator />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25, width: '100%' }}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography className={classes.subHeading}>Total Ad Spend</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  {up === '+' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  <Typography sx={{ ml: 1 }} fontSize="medium">
                    <NumberFormat suffix="%" prefix={up} value={percentage || 0} displayType="text" decimalScale={2} />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default TotalAddSpend;
