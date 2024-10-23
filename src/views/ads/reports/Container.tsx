/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Theme, Button, Typography, Grid, Card, Stack, Skeleton } from '@material-ui/core';

// third-party imports
import gql from 'store/ads/reports/gql';
import gqlFacebookAds from 'store/account/socials/gql';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// project imports
import { AdsReportsProps } from './types';
import { gridSpacing } from 'views/common/constant';
import DateRangePicker, { getDateRange, IDateRange, IDatePreset } from 'ui-component/date-range-picker';
import SpeakerIcon from 'assets/images/etc/speaker.svg';
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import SocialAccount from 'views/account/socials/SocialAccount';
import FacebookIcon from 'assets/images/icons/fb.png';
import ConnectPuzzleIcon from 'assets/images/pages/connect-puzzle.png';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  reportCards: {
    marginTop: 20
  },
  card: {
    padding: 20,
    border: `1px solid ${theme.palette.grey[100]}`,
    backgroundColor: theme.palette.grey[50]
  },
  cardValue: {
    fontWeight: 'normal'
  },
  cardLabel: {
    marginTop: 16,
    fontWeight: 'normal'
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    padding: '8px 20px',
    backgroundColor: theme.palette.primary.main
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  bannerText: {
    marginTop: 4,
    color: '#FFFFFF'
  },
  bannerButton: {
    marginLeft: 'auto !important',
    padding: '8px 24px',
    borderRadius: 4,
    color: theme.palette.text.dark,
    background: '#FFFFFF',
    '&:hover': {
      background: '#F1F1F1'
    }
  }
}));

const Container = (props: AdsReportsProps) => {
  const classes = useStyles();
  const [lastCollectedDate] = useState(new Date());
  const { loading: facebookAdAccountLoading, data: facebookAdAccountData } = useQuery(gqlFacebookAds.query.facebookAds, {
    fetchPolicy: 'network-only'
  });
  const facebookAdAccountActiveName = facebookAdAccountData?.facebookAds?.activeName;
  const facebookAdAccountDateConnected = facebookAdAccountData?.facebookAds?.dateConnected;
  const [dateRange, setDateRange] = useState<{ value: IDatePreset; range: IDateRange }>({
    value: 'today',
    range: getDateRange('today')
  });

  const { data: facebookCampaignReportsData } = useQuery(gql.query.getFacebookCampaignReports, {
    fetchPolicy: 'network-only',
    variables: {
      paginator: {
        dateRange: {
          from: dateRange.range.from ? format(dateRange.range.from, 'yyyy-MM-dd') : null,
          to: dateRange.range.to ? format(dateRange.range.to, 'yyyy-MM-dd') : null
        }
      }
    }
  });
  const facebookCampaignReports = facebookCampaignReportsData?.facebookCampaignReports?.data;

  const handleDateRangeChange = (value: IDatePreset, range: IDateRange) => {
    setDateRange({ value, range });
  };

  useEffect(() => {
    if (facebookAdAccountDateConnected) {
      setDateRange({
        value: 'custom',
        range: {
          from: new Date(facebookAdAccountDateConnected),
          to: new Date()
        }
      });
    }
  }, [facebookAdAccountDateConnected]);

  if (facebookAdAccountLoading) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height="150px" />
        <Skeleton variant="rectangular" width="100%" height="500px" sx={{ marginTop: '20px' }} />
        <Skeleton variant="rectangular" width="100%" height="100px" sx={{ marginTop: '20px' }} />
      </>
    );
  }

  return !facebookAdAccountActiveName ? (
    <MainCardCustom
      icon={
        <img
          src={ConnectPuzzleIcon}
          alt="Connect Puzzle icon"
          width={130}
          height={130}
          style={{ transform: 'rotate(-35deg)', marginTop: '30px', marginRight: '-12px' }}
        />
      }
      title="Connect your Ad Account"
      subTitle="Level up your digital marketing strategy by connecting your Ad Account! Tailor your audience and expand your reach with our automated ad templates."
      sx={{
        background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
      }}
      action={
        <Box sx={{ width: '350px' }}>
          <SocialAccount
            name="Facebook Ads"
            description="Launch ads on Facebook and Instgram, and track their performance with our analytics."
            variant="connect"
            type="facebookAds"
            imgSrc={FacebookIcon}
          />
        </Box>
      }
      titleWhite
    />
  ) : (
    <>
      <MainCardCustom
        title="Ad Account Report"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat massa vitae purus pellentesque scelerisque. Nam consectetur in nisl id finibus."
        sx={{
          background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
        }}
        hasFloatingImages
        titleWhite
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
            <img src={FacebookIcon} alt={FacebookIcon} style={{ height: '45px', width: '45px' }} />
            <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
              {facebookAdAccountLoading ? <Skeleton variant="text" width="300px" height="40px" /> : facebookAdAccountActiveName}
            </Typography>
            <Typography variant="caption" sx={{ width: '100%' }}>
              Data last collected: {format(lastCollectedDate, 'do LLLL, h.mmaaa')}
            </Typography>
          </Box>
          <DateRangePicker value={dateRange.value} defaultRange={dateRange.range} onChange={handleDateRangeChange} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
            {dateRange?.range?.from &&
              dateRange?.range?.to &&
              isValid(dateRange?.range?.from) &&
              isValid(dateRange?.range?.to) &&
              `${format(new Date(dateRange.range.from), 'do LLLL')} - ${format(new Date(dateRange.range.to), 'do LLLL')}`}
          </Typography>
        </Box>
        <Grid container spacing={gridSpacing} className={classes.reportCards}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                ${facebookCampaignReports?.spent.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Spend
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.impression.toLocaleString('en-US', { maximumFractionDigits: 0 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Impressions
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.reach.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Ave. Reach
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.frequency.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Average Frequency
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.totalClick.toLocaleString('en-US', { maximumFractionDigits: 0 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Total Click
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                ${facebookCampaignReports?.cpc.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Cost per Click
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.totalLead.toLocaleString('en-US', { maximumFractionDigits: 0 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Total Lead
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                ${facebookCampaignReports?.cpl.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Cost per Lead
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                ${facebookCampaignReports?.cpc.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Ave. Cost Per Click
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <Typography variant="h1" component="div" className={classes.cardValue}>
                {facebookCampaignReports?.ctr.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0}%
              </Typography>
              <Typography variant="h3" component="div" className={classes.cardLabel}>
                Click Through Rate
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </MainCardCustom>
      <Card className={classes.banner}>
        <Stack direction="row" spacing={4} alignItems="center" width="100%">
          <Box>
            <img src={SpeakerIcon} width={115} height={85} alt={SpeakerIcon} />
          </Box>
          <Box>
            <Typography className={classes.bannerTitle}>Want to know how individual campaigns are performing?</Typography>
            <Typography className={classes.bannerText}>You can access reports via the campaigns page.</Typography>
          </Box>
          <Button component={Link} to="/ads/campaigns" variant="contained" className={classes.bannerButton}>
            View now
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default Container;
