/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { IAudienceCard } from 'views/insights/interface';
import { gridSpacing } from 'views/common/constant';
import { AudienceFilter } from 'types';

// material ui
import { Box, Grid, Typography } from '@material-ui/core';

// gql
// import gql from 'store/insights/gql';
// import { useLazyQuery } from '@apollo/client';

// components
import MainCard from 'ui-component/cards/MainCard';
import Overlay from 'ui-component/Overlay';
import AudienceLinear from './AudienceLinear';

// assets
import lockIcon from 'assets/images/etc/lock.png';

const AudienceCard: FC<IAudienceCard> = ({
  mainTitle,
  initialActiveItem,
  audienceChart: { title, color },
  filters,
  dateRange,
  disabled = false
}) => {
  const [activeItem, setActiveItem] = useState<AudienceFilter>(initialActiveItem || 'CITY');

  const handleChangeFilter = (type: AudienceFilter) => {
    setActiveItem(type);
  };

  // dummy data
  const values = [
    {
      title: 'Test 1',
      percentage: 89
    },
    {
      title: 'Test 2',
      percentage: 54
    },
    {
      title: 'Test 3',
      percentage: 21
    },
    {
      title: 'Test 4',
      percentage: 90
    },
    {
      title: 'Test 5',
      percentage: 12
    }
  ];

  // @Todo when query is ready

  // const [getInstagramAudienceLazy, { data: instagramAudienceData, loading: instagramAudienceLoading }] = useLazyQuery(
  //   gql.query.instagramAudience,
  //   {
  //     fetchPolicy: 'network-only'
  //   }
  // );
  // const instagramAudience = instagramAudienceData?.instagramAudience;

  // useEffect(() => {
  //   getInstagramAudienceLazy({
  //     variables: {
  //       filterType: activeItem,
  //       dateRange: {
  //         from: dateRange?.from,
  //         to: dateRange?.to
  //       }
  //     }
  //   });
  // }, [activeItem, dateRange]);

  // const values = useMemo(
  //   () =>
  //     instagramAudience?.data?.map((e: any): { title: string; percentage: number } => ({
  //       title: e.label,
  //       percentage: e.value
  //     })) || [],
  //   [instagramAudience]
  // );

  return (
    <MainCard title={mainTitle} sxCardHeader={{ p: '15px' }} sx={{ height: '100%' }} defaultSizeTitle>
      <Grid container spacing={gridSpacing}>
        <Grid container item xs={12} sx={{ pt: '16px !important' }} gap={2}>
          <Grid item xs={12} sx={{ pt: '16px !important', position: 'relative' }}>
            {disabled && (
              <Overlay>
                <Box sx={{ textAlign: 'center', padding: '2rem' }}>
                  <Box>
                    <img src={lockIcon} alt="Locked" style={{ height: '75px', width: '75px' }} />
                  </Box>
                  <Typography variant="h2" component="div" sx={{ marginBottom: '10px' }}>
                    Audience Insights
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'normal' }}>
                    Reach 1000 page likes to unlock Audience Insights!
                  </Typography>
                </Box>
              </Overlay>
            )}
            <AudienceLinear
              color={color}
              filters={filters}
              activeItem={activeItem}
              values={values}
              // loading={instagramAudienceLoading}
              onChangeFilter={handleChangeFilter}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AudienceCard;
