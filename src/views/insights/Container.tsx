/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

import Insights from './Insights';

const Container: FC = (props: any) => {
  const { root, doCallInsightsApi, doUpdateData } = props;

  return <Insights />;
};

export default Container;
