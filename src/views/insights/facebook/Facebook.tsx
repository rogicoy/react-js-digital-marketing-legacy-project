/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { IDateRange } from 'ui-component/date-range-picker';

// project imports
import TabPanel from 'ui-component/TabPanel';
import Overview from './overview/index';
import Posts from './posts/index';

const routeValue: {
  [tab: string]: number;
} = {
  overview: 0,
  posts: 1
};

interface IFacebookTabs {
  dateRange: IDateRange;
}

const FacebookTabs: FC<IFacebookTabs> = ({ dateRange }) => {
  const { tab } = useParams();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (tab) {
      const newValue = routeValue[tab] || 0;
      setValue(newValue);
    }
  }, [tab]);

  return (
    <div>
      <TabPanel value={value} index={0}>
        <Overview dateRange={dateRange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts />
      </TabPanel>
    </div>
  );
};

export default FacebookTabs;
