/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Tab, Tabs, Theme } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TabPanel from 'ui-component/TabPanel';
import Profile from './profile';
import Billing from './billing';
import Security from './security';
import Notifications from './notifications';
import Business from './business';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  accountTab: {
    marginBottom: '24px',
    minHeight: 'auto',
    '& button': {
      minWidth: '100px'
    },
    '& a': {
      minHeight: 'auto',
      minWidth: '10px',
      padding: '12px 8px',
      marginRight: '18px',
      color: theme.palette.grey[600]
    },
    '& a.Mui-selected': {
      color: theme.palette.primary.main
    }
  }
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const routeValue: {
  [tab: string]: number;
} = {
  profile: 0,
  businessdetails: 1,
  billing: 2,
  security: 3,
  notifications: 4,
  connectaccounts: 5
};

// ==============================|| PROFILE 3 ||============================== //

const MainCardAccount = () => {
  const classes = useStyles();
  const { tab } = useParams();

  useEffect(() => {
    if (tab) {
      const newValue = routeValue[tab] || 0;
      setValue(newValue);
    }
  }, [tab]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Account">
      <div>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          className={classes.accountTab}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Tab component={Link} to="/account/profile" label="Profile" {...a11yProps(0)} />
          <Tab component={Link} to="/account/businessdetails" label="Business Details" {...a11yProps(1)} />
          <Tab component={Link} to="/account/billing" label="Billing" {...a11yProps(2)} />
          <Tab component={Link} to="/account/security" label="Security" {...a11yProps(3)} />
          <Tab component={Link} to="/account/notifications" label="Notifications" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Business />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Billing />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Security />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Notifications />
        </TabPanel>
      </div>
    </MainCard>
  );
};

export default MainCardAccount;
