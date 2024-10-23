/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AlertQueueItemType } from './types';
import { SectionPrefix } from '../types';

export type AlertQueueItem = {
  type: AlertQueueItemType;
  section: SectionPrefix;
  message: string;
};

export type AlertQueueState = {
  alerts: AlertQueueItem[];
  openAlert: boolean;
};
