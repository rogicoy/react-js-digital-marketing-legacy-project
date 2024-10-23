/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import { gridSpacing } from 'views/common/constant';
import { ICampaignItem } from '../interface';
import CardListItem from './CardListItem';

interface ICardListProps {
  list: Array<ICampaignItem>;
}

const CardList: FC<ICardListProps> = ({ list }) => (
  <Grid container spacing={gridSpacing}>
    {list.map((item) => (
      <Grid key={item.id} item xs={12} sm={6} lg={4}>
        <CardListItem {...item} />
      </Grid>
    ))}
  </Grid>
);

export default CardList;
