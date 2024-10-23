/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { gridSpacing } from 'views/common/constant';

// grapqhl
import gql from 'store/insights/gql';
import { useLazyQuery } from '@apollo/client';
import { IFbPageSummary, IFbPageSummaryArray } from 'views/insights/interface';
import { IDateRange } from 'ui-component/date-range-picker';

// material ui
import { Grid, Box, Card, CardContent, Typography } from '@material-ui/core';

const PageSummaryFacebook: FC<{
  dateRange: IDateRange;
}> = ({ dateRange }) => {
  // gql
  const {
    query: { facebookPageSummary }
  } = gql;

  const [getFacebookSummary, { data }] = useLazyQuery<{
    facebookPageSummary: IFbPageSummary;
  }>(facebookPageSummary, { fetchPolicy: 'network-only' });
  const fbPageSummary = data?.facebookPageSummary;

  const memoPageSummary = useMemo(() => {
    const fbSummary: IFbPageSummaryArray[] = [
      {
        value: fbPageSummary?.postReach || 0,
        label: 'Post Reach'
      },
      {
        value: fbPageSummary?.postEngagement || 0,
        label: 'Post Engagement'
      },
      {
        value: fbPageSummary?.videoViews || 0,
        label: 'Video Views'
      },
      {
        value: fbPageSummary?.storyReach || 0,
        label: 'Story Reach'
      },
      {
        value: fbPageSummary?.actionOnPage || 0,
        label: 'Actions on page'
      },
      {
        value: fbPageSummary?.pageViews || 0,
        label: 'Page View'
      },
      {
        value: fbPageSummary?.pageLikes || 0,
        label: 'Page Likes'
      },
      {
        value: fbPageSummary?.newFollowers || 0,
        label: 'New Followers'
      }
    ];

    return fbSummary;
  }, [fbPageSummary]);

  useEffect(() => {
    if (dateRange) {
      getFacebookSummary({
        variables: {
          paginator: {
            dateRange: {
              from: dateRange.fromFormatted,
              to: dateRange.toFormatted
            }
          }
        }
      });
    }
  }, [dateRange]);

  return (
    <Grid container item spacing={gridSpacing}>
      {memoPageSummary.map((item: IFbPageSummaryArray, index: number) => (
        <Grid item md={3} key={index}>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h2" component="div" sx={{ fontWeight: '500', mb: 4 }}>
                  <NumberFormat value={item.value} displayType="text" decimalScale={2} thousandSeparator />
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'normal' }}>
                  {item.label}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PageSummaryFacebook;
