/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { Box } from '@material-ui/core';

interface ITabPanel {
  children: React.ReactElement;
  value: number;
  index: number;
}

// tabs
const TabPanel: React.FC<ITabPanel> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box
          sx={{
            p: 0
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
