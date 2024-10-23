/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import NumberFormat from 'react-number-format';
import helpers from 'utils/helpers';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, Typography, Box } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ExportButton from 'views/common/components/ExportButton';

// assets
import DbIcon from 'assets/images/icons/db-in-circle.svg';
import { gridSpacing } from 'views/common/constant';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IPerformanceValue } from '../interface';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    background: theme.palette.deepPurple[500],
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
    right: 25,
    top: 25
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
    color: theme.palette.deepPurple[50],
    textTransform: 'capitalize'
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

export interface CostPerResultProps {
  performance: IPerformanceValue;
  objective: string;
  isLoading?: boolean;
}

const CostPerResult: FC<CostPerResultProps> = ({ performance, objective, isLoading }) => {
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
            <img src={DbIcon} alt="money icon" className={classes.bubbleImage} />
          </Box>
          <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
            <ExportButton color="#fff" />
          </Box>
          <Grid container direction="column" sx={{ mt: gridSpacing }}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    <NumberFormat value={performance.value} prefix="$" displayType="text" decimalScale={2} thousandSeparator />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ mb: 1.25, width: '100%' }}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography className={classes.subHeading}>{`Cost ${helpers.textLowerCase(objective)}`}</Typography>
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

export default CostPerResult;
