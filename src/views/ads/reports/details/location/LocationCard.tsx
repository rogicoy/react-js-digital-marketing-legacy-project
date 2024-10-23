/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { HeadCell } from 'types';
import { IFacebookAdResultBreakdown } from '../interface';

// grapqhl
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell, Theme } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ExportButton from 'views/common/components/ExportButton';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import SimpleSkeletonCard from 'ui-component/cards/Skeleton/SimpleSkeletonCard';
import { IDatePreset, IDateRange } from 'ui-component/date-range-picker';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 350,
    '& tr > th:first-child, tr > td:first-child': {
      paddingLeft: 0
    },
    '& td:first-child': {
      fontSize: '0.825rem',
      color: '#000'
    },
    '& td': {
      fontSize: '0.825rem',
      color: theme.palette.grey[500]
    }
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  blackBox: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.text.primary
  }
}));

const headCells: HeadCell[] = [
  {
    id: 'range',
    label: 'Range'
  },
  {
    id: 'spend',
    label: 'Spend',
    align: 'center'
  },
  {
    id: 'reach',
    label: 'Reach',
    align: 'center'
  },
  {
    id: 'impressions',
    label: 'Impressions',
    align: 'center'
  },
  {
    id: 'frequency',
    label: 'Frequency',
    align: 'center'
  },
  {
    id: 'cpc',
    label: 'CPC',
    align: 'center'
  },
  {
    id: 'ctr',
    label: 'CTR',
    align: 'center'
  },
  {
    id: 'clicks',
    label: 'Clicks',
    align: 'center'
  }
];

const LocationCard: FC<{ campaignId: string | undefined; dateRange: { value: IDatePreset; range: IDateRange } }> = ({
  campaignId,
  dateRange
}) => {
  const classes = useStyles();

  // query
  const {
    query: { facebookAdResultBreakdown }
  } = gql;

  const [getFbResultBreakdown, { data, loading }] = useLazyQuery<{
    facebookAdResultBreakdown: Array<IFacebookAdResultBreakdown>;
  }>(facebookAdResultBreakdown, {
    fetchPolicy: 'network-only'
  });
  const fbAdResultBreakdown = data?.facebookAdResultBreakdown;

  const memoAdsResultsBreakdown = useMemo(() => {
    let adsResultsBreakdown: Array<IFacebookAdResultBreakdown> = [];

    if (fbAdResultBreakdown) {
      adsResultsBreakdown = fbAdResultBreakdown;
    }

    return adsResultsBreakdown;
  }, [fbAdResultBreakdown]);

  useEffect(() => {
    if (campaignId) {
      getFbResultBreakdown({
        variables: {
          input: {
            campaignId,
            breakdown: 'region',
            paginator: {
              dateRange: {
                from: dateRange.range.fromFormatted,
                to: dateRange.range.toFormatted
              }
            }
          }
        }
      });
    }
  }, [campaignId, dateRange, getFbResultBreakdown]);

  return (
    <MainCard sx={{ height: '100%', position: 'relative', '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ position: 'absolute', right: 0 }}>
        <ExportButton />
      </Box>
      <Box sx={{ py: 2 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ px: 2 }} variant="h3">
              Location
            </Typography>
          </Grid>
          <Grid item zeroMinWidth>
            <Divider />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ px: 2, pb: 3, pt: 0 }}>
        {loading ? (
          <SimpleSkeletonCard />
        ) : (
          <TableContainer>
            <Table className={classes.table}>
              <EnhancedTableHead sortable={false} headCells={headCells} numSelected={0} rowCount={memoAdsResultsBreakdown.length} />
              <TableBody>
                {memoAdsResultsBreakdown.map((item: IFacebookAdResultBreakdown, index: number) => (
                  <TableRow hover key={index}>
                    <TableCell>{item.breakdown}</TableCell>
                    <TableCell align="center">{item.spend}</TableCell>
                    <TableCell align="center">{item.reach}</TableCell>
                    <TableCell align="center">{item.impressions}</TableCell>
                    <TableCell align="center">{item.frequency}</TableCell>
                    <TableCell align="center">
                      <NumberFormat prefix="$" value={item.cpc} displayType="text" thousandSeparator decimalScale={2} />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat prefix="$" value={item.ctr} displayType="text" thousandSeparator decimalScale={2} />
                    </TableCell>
                    <TableCell align="center">{item.clicks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}{' '}
      </Box>
    </MainCard>
  );
};

export default LocationCard;
