/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { socialActive } from 'views/common/constant';
import { ISocialActive, ISocialTab, ISocialType } from 'types';

// material ui
import { Button, Tab, Tabs, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
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
      textTransform: 'none',
      color: theme.palette.grey[600],
      '&:first-child': {
        paddingLeft: 0
      }
    },
    '& a.Mui-selected': {
      color: theme.palette.primary.main
    }
  }
}));

const routeValue: {
  [tab: string]: number;
} = {
  overview: 0,
  posts: 1,
  stories: 2,
  hashtags: 3
};

const ActiveTab: FC<{ social: ISocialType; onExport: () => void }> = ({ social, onExport }) => {
  const classes = useStyles();
  const { tab } = useParams();

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, value: number) => {
    setSelectedTab(value);
  };

  // to get current tab
  useEffect(() => {
    if (tab) {
      const newValue = routeValue[tab] || 0;
      setSelectedTab(newValue);
    }
  }, [tab]);

  const memoActiveSocial = useMemo(() => socialActive.find((item: ISocialActive) => item.social === social), [social]);

  return (
    <>
      <Tabs value={selectedTab} indicatorColor="primary" onChange={handleChangeTab} className={classes.tabs} variant="scrollable">
        {memoActiveSocial?.socialTabs.map((item: ISocialTab, index: number) => (
          <Tab component={Link} to={item.to} label={item.label} key={index} />
        ))}
      </Tabs>
      <Button disableElevation variant="contained" sx={{ px: 5 }} onClick={onExport}>
        Export Report
      </Button>
    </>
  );
};

export default ActiveTab;
