/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { AlertQueueItem } from 'store/common/alert-queue/models';

export type AlertQueueProps = {
  children: React.ReactNode;
  topAlert: AlertQueueItem | undefined;
  isOpenAlert: boolean;
  doOpenAlert: (open: boolean) => void;
  doDequeueAlert: () => void;
};
