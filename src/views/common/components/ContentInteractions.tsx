/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import clsx from 'clsx';
import { IContentInteractions, IInteractions } from 'types';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  boxIcon: {
    borderRadius: '50%',
    background: '#d5c0fa',
    padding: '9px',
    height: '50px',
    width: '50px',
    textAlign: 'center'
  },
  boxTypography: {
    flex: 1,
    textAlign: 'center'
  },
  bBottom: {
    borderBottom: '1px solid #e4e4e4'
  },
  bRight: {
    borderRight: '1px solid #e4e4e4'
  }
}));

const ContentInteractions: FC<IInteractions> = ({ className, interactions }) => {
  const classes = useStyles();

  return (
    <Card className={className}>
      <CardContent sx={{ p: 0, pb: '0 !important' }}>
        <Grid container spacing={0}>
          <Grid item md={12} className={classes.bBottom}>
            <Box sx={{ p: '1rem' }}>
              <Typography variant="h3">Content Interactions</Typography>
            </Box>
          </Grid>

          <Grid item container md={12}>
            {interactions.map((item: IContentInteractions, index: number) => (
              <Grid item md={6} className={clsx(classes.bRight, classes.bBottom)} key={index}>
                <Box display="flex" alignItems="center" sx={{ p: '1rem' }}>
                  <Box className={classes.boxIcon}>{item.icon}</Box>
                  <Box className={classes.boxTypography}>
                    <Typography variant="h3">{item.value}</Typography>
                    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                      {item.subTitle}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContentInteractions;
