/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, CardContent, Box, Typography, Link, Skeleton, Theme, Card, Grid } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LeadsTable from './LeadsTable';
import gql from 'store/ads/gql';
import gqlSocial from 'store/account/socials/gql';
import { IFetchLeadsResponse, IFetchLeadsVariables, ILeadsTableRow } from './interface';
import utils from './utils';
import csvHelper from 'utils/csvHelper';
import useAuth from 'hooks/useAuth';
import DateRangePicker, { getDateRange, IDatePreset, IDateRange } from 'ui-component/date-range-picker';
import FacebookIcon from 'assets/images/icons/fb.png';
import ConnectPuzzle2 from 'assets/images/pages/connect-puzzle-2.png';
import Astronaut from 'assets/images/pages/astronaut.gif';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '16px',
    height: 185,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.common.white,
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
    '&:hover': {
      border: `1px solid${theme.palette.primary.main}`
    }
  },
  title: {
    fontSize: '2.125rem',
    fontWeight: 'bold',
    color: theme.palette.common.white
  },
  img: {
    position: 'absolute',
    top: 0,
    left: '-24px'
  }
}));

const Container = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<{ value: IDatePreset; range: IDateRange }>({
    value: 'today',
    range: getDateRange('today')
  });

  const listQuery = gqlSocial.query.facebookPage;
  const [getListLazy, { data: listData, loading: listLoading }] = useLazyQuery(listQuery, {
    fetchPolicy: 'network-only'
  });
  const listObject = listData?.facebookPage;

  const [requested, setRequested] = useState(false);
  const [rows, setRows] = useState<ILeadsTableRow[]>([]);
  const [getLeadsLazy, { data: leadsData, loading: leadsLoading }] = useLazyQuery<IFetchLeadsResponse, IFetchLeadsVariables>(
    gql.query.facebookLeads,
    {
      fetchPolicy: 'network-only'
    }
  );

  const fetchLeads = useCallback(
    (variables: IFetchLeadsVariables) => {
      getLeadsLazy({ variables });
    },
    [getLeadsLazy]
  );

  useEffect(() => {
    getListLazy();
    setRequested(true);
  }, []);

  useEffect(() => {
    const variables: IFetchLeadsVariables = {};
    fetchLeads(variables);
  }, []);

  useEffect(() => {
    if (leadsData?.facebookLeads.data) {
      const newRows = leadsData.facebookLeads.data.map(
        (item: ILeadsTableRow): ILeadsTableRow => ({
          ...item,
          status: utils.formatStatus(item.createdAt)
        })
      );
      setRows(newRows);
    }
  }, [leadsData]);

  const handleExport = () => {
    const fields = Object.keys(rows[0]);
    csvHelper.exportTable(rows, { fields, filename: 'Leads' });
  };

  const handleDateRangeChange = (value: IDatePreset, range: IDateRange) => {
    setDateRange({ value, range });
  };

  const name = 'Facebook Page';
  const imgSrc = FacebookIcon;
  const variant = 'connect';
  const description = 'Launch ads on Facebook and Instagram, and track their performance with our analytics.';

  if (listLoading || !requested) {
    return (
      <Box sx={{ m: 3 }}>
        <Skeleton height={300} animation="wave" />
      </Box>
    );
  }

  if (!listObject) {
    return (
      <MainCard
        sx={{
          position: 'relative',
          background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={1}>
            <img alt="Puzzle 2" src={ConnectPuzzle2} className={classes.img} />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ ml: 3 }}>
              <Typography className={classes.title} variant="h3" gutterBottom>
                To view leads connect your Facebook Page
              </Typography>
              <Typography sx={{ color: 'common.white' }}>
                To see your leads come through, you need to connect the facebook page which is running the ad.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Card className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item display="flex" alignItems="center">
                      <img alt={name} src={imgSrc} style={{ width: 26, height: 26, filter: 'grayscale(100)' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth display="flex" alignItems="center">
                      <Typography variant="h3">{name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography>{description}</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={0}>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                  <Button component={RouterLink} to="/account/connectaccounts" variant="text" sx={{ py: 0, px: 1 }}>
                    {variant}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MainCard>
    );
  }

  if (!leadsLoading && !rows.length) {
    return (
      <MainCard
        sx={{
          position: 'relative',
          background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <img width={208} height={155} alt="Astronaut" src={Astronaut} />
          </Grid>
          <Grid item xs={5}>
            <Box>
              <Typography className={classes.title} variant="h3" gutterBottom>
                Your page is connected, but we can’t find any leads.
              </Typography>
              <Typography sx={{ color: 'common.white' }}>
                This could be for a few reasons. Perhaps you haven’t set up a lead generation campaign, or maybe there’s something to change
                with your account.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">🤓 Helpful Resources:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Article one - Best Practice</Typography>
                  <Typography>Lorum ibsun</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Article two - Inspiration</Typography>
                  <Typography>Lorum ibsun</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MainCard>
    );
  }

  return (
    <MainCard
      title="Leads"
      content={false}
      secondary={
        <Button disabled={!rows.length || leadsLoading} disableElevation variant="contained" onClick={handleExport}>
          Export Leads
        </Button>
      }
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ mr: 2 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              View your leads
            </Typography>
            <Typography gutterBottom>
              View your leads Notification emails regarding new leads are currently being send to{' '}
              <Link underline="none" fontWeight={500} color="inherit" href={`mailto:${user?.email}`}>
                {user?.email}.
              </Link>
            </Typography>
          </Box>
          <DateRangePicker value={dateRange.value} onChange={handleDateRangeChange} />
        </Box>
      </CardContent>

      {leadsLoading ? (
        <Box sx={{ m: 3 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <LeadsTable rows={rows} />
      )}
    </MainCard>
  );
};

export default Container;
