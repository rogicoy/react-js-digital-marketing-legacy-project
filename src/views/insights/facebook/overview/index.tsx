/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { IDateRange } from 'ui-component/date-range-picker';
import OverviewFacebook from './OverviewFacebook';

interface IFacebookTabs {
  dateRange: IDateRange;
}

const Overview: FC<IFacebookTabs> = ({ dateRange }) => <OverviewFacebook dateRange={dateRange} />;

export default Overview;
