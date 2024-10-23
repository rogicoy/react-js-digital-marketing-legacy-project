/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Chart, { Props as ChartProps } from 'react-apexcharts';
import NumberFormat from 'react-number-format';
import { gridSpacing } from 'views/common/constant';
import { IDateRange } from 'ui-component/date-range-picker';
import { IGraphCard, IReports, IReportsPage, ISocialInfo } from 'views/insights/interface';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

// components
import MainCard from 'ui-component/cards/MainCard';
import SocialBadge from 'ui-component/extended/SocialBadge';

// assets
import ArrowForward from '@material-ui/icons/ArrowForward';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  mainCard: {
    border: '1px solid #ffffff',
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  },
  box: {
    textAlign: 'center'
  },
  contentRoot: {
    padding: '16px'
  },
  card: {
    border: '1px solid #e1e0e0'
  },
  content: {
    padding: '0px !important',
    position: 'relative'
  },
  contentContainer: {
    padding: '16px !important',
    paddingBottom: 0,
    color: '#fff'
  },
  fontStyle: {
    fontWeight: 400
  },
  boxButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0
  },
  typography: {
    color: '#9e9e9e',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    '&.active': {
      color: '#9618f7'
    },
    '&:hover': {
      color: '#9618f7'
    }
  },
  discBox: {
    position: 'absolute',
    padding: '20px',
    zIndex: '1',
    height: '100%',
    width: '100%',
    background: 'rgba(255,255,255,0.75)',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  blurredText: {
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.5)'
  }
}));

const graphText: {
  [social: string]: string;
} = {
  facebook: 'Page likes',
  instagram: 'Followers',
  twitter: 'Followers',
  linkedin: 'Connections'
};

const GraphCard: FC<IGraphCard & { dateRange: IDateRange }> = ({
  title,
  value,
  img,
  social,
  socialName,
  socialInfo,
  report,
  growthReport,
  dateRange
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // states
  const [hoverReport, setHoverReport] = useState<number | null>(null);

  const chartData: ChartProps = {
    type: 'area',
    height: 95,
    options: {
      chart: {
        id: 'graph-chart',
        sparkline: {
          enabled: true
        },
        background: '#fff'
      },
      dataLabels: {
        enabled: false
      },
      labels: growthReport.map((item: IReportsPage) => format(new Date(item.date), 'do LLL yyyy')),
      colors: ['#9618f7'],
      stroke: {
        curve: 'smooth',
        width: 2
      }
    },
    series: [
      {
        name: graphText[social] as string,
        data: growthReport.length < 7 ? [0, 0, 0, 0, 0, 0, 0] : growthReport.map((item: IReportsPage) => item.count)
      }
    ]
  };

  return (
    <MainCard content={false} className={classes.mainCard}>
      <CardContent
        classes={{
          root: classes.contentRoot
        }}
      >
        <Grid container spacing={gridSpacing}>
          {/* SOCIAL BADGE SECTION */}
          <Grid item alignItems="center" display="flex" xs={12}>
            <SocialBadge social={social} avatarProps={{ src: img }} />
            <Typography variant="h3" component="div" sx={{ paddingX: 2 }}>
              {socialName}
            </Typography>
          </Grid>

          {/* SOCIAL INFO SECTION */}
          <Grid item xs={12}>
            <Grid container alignContent="center">
              {socialInfo.map((item: ISocialInfo, index: number) => (
                <Grid item md={4} key={index}>
                  <Box className={classes.box}>
                    <Typography variant="h4">
                      <NumberFormat value={item.sValue} displayType="text" thousandSeparator />
                    </Typography>
                    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                      {item.sTitle}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* GRAPH SECTION */}
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Grid container className={classes.contentContainer}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'normal' }} component="div">
                          {title}
                        </Typography>
                        {dateRange.from && dateRange.to && (
                          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }} component="div">
                            {format(new Date(dateRange.from), 'do LLL yyyy')} - ${format(new Date(dateRange.to), 'do LLL yyyy')}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item>
                        <Typography variant="h4" component="div" sx={{ color: theme.palette.grey[800] }}>
                          {Number(value) > 0 && '+'}
                          {Number(value) > 0 ? value : '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Chart {...chartData} />
              </CardContent>
            </Card>
          </Grid>

          {/* AVAILABLE REPORTS SECTION */}
          {report.length > 0 && (
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="div" sx={{ color: '#000000', fontWeight: 'normal' }}>
                    Available Reports:
                  </Typography>
                </Grid>

                <Grid container item xs={12}>
                  {report.map((item: IReports, index: number) => (
                    <Grid item xs={3} key={index}>
                      <Box
                        display="flex"
                        alignItems="center"
                        component="button"
                        className={classes.boxButton}
                        onMouseEnter={() => setHoverReport(index)}
                        onMouseLeave={() => setHoverReport(null)}
                      >
                        <Link to={item.rTo} style={{ textDecoration: 'none' }}>
                          <Typography variant="subtitle1" component="div" className={classes.typography}>
                            {item.rTitle}
                          </Typography>
                        </Link>
                        {hoverReport === index && <ArrowForward fontSize="small" htmlColor="#9618f7" />}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default GraphCard;
