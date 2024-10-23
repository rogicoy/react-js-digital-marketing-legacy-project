/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useState, useMemo } from 'react';
import { IAudienceCard } from 'views/insights/interface';
import { gridSpacing } from 'views/common/constant';

// material ui
import { Grid } from '@material-ui/core';

// components
import MainCard from 'ui-component/cards/MainCard';
import AudienceLinear from './AudienceLinear';
import { useLazyQuery } from '@apollo/client';
import gql from 'store/insights/gql';
import { AudienceFilter } from 'types';

const AudienceCard: FC<IAudienceCard> = ({ mainTitle, initialActiveItem, audienceChart: { title, color }, filters, dateRange }) => {
  const [activeItem, setActiveItem] = useState<AudienceFilter>(initialActiveItem || 'CITY');

  const [getInstagramAudienceLazy, { data: instagramAudienceData, loading: instagramAudienceLoading }] = useLazyQuery(
    gql.query.instagramAudience,
    {
      fetchPolicy: 'network-only'
    }
  );
  const instagramAudience = instagramAudienceData?.instagramAudience;

  useEffect(() => {
    getInstagramAudienceLazy({
      variables: {
        filterType: activeItem,
        dateRange: {
          from: dateRange?.from,
          to: dateRange?.to
        }
      }
    });
  }, [activeItem, dateRange]);

  const handleChangeFilter = (type: AudienceFilter) => {
    setActiveItem(type);
  };

  const values = useMemo(
    () =>
      instagramAudience?.data?.map((e: any): { title: string; percentage: number } => ({
        title: e.label,
        percentage: e.value
      })) || [],
    [instagramAudience]
  );

  return (
    <MainCard title={mainTitle} sxCardHeader={{ p: '15px' }} sx={{ height: '100%' }} defaultSizeTitle>
      <Grid container spacing={gridSpacing}>
        <Grid container item xs={12} sx={{ pt: '16px !important' }} gap={2}>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <AudienceLinear
              color={color}
              filters={filters}
              activeItem={activeItem}
              values={values}
              loading={instagramAudienceLoading}
              onChangeFilter={handleChangeFilter}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AudienceCard;
