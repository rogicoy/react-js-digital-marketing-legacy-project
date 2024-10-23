/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';

// project imports
import TabPanel from 'ui-component/TabPanel';
import IgOverview from './overview/index';
import IgPosts from './posts/index';
import IgStories from './stories/index';
// import IgHashTags from './hashtags/index';
import { IDateRange } from 'ui-component/date-range-picker';

const routeValue: {
  [tab: string]: number;
} = {
  overview: 0,
  posts: 1,
  stories: 2,
  hashtags: 3
};

interface IInstagramTabs {
  dateRange?: IDateRange;
}

const InstagramTabs: FC<IInstagramTabs> = ({ dateRange }) => {
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
        <IgOverview dateRange={dateRange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IgPosts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <IgStories />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <IgHashTags />
      </TabPanel> */}
    </div>
  );
};

export default InstagramTabs;
