/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const LoaderCircle: FC = () => (
  <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress />
  </Backdrop>
);

export default LoaderCircle;
