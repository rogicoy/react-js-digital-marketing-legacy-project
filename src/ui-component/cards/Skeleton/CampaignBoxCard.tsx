/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';

import { makeStyles } from '@material-ui/styles';
import { Card, Chip, Grid, Theme, Box, Skeleton } from '@material-ui/core';

// style card
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '16px',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
    border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`
  }
}));

const CampaignBoxCard: FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={gridSpacing}>
      {[1, 2, 3, 4].map((item: number) => (
        <Grid key={item} item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Skeleton variant="text" height={20} width={60} animation="wave" />
                  <Skeleton variant="text" animation="wave">
                    <Chip sx={{ textTransform: 'capitalize' }} variant="filled" label="Active" />
                  </Skeleton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Skeleton variant="text" height={20} width={150} animation="wave" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Skeleton variant="text" height={15} width={95} animation="wave" />
                <Skeleton variant="text" height={15} width={95} animation="wave" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignBoxCard;
