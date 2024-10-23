/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { differenceInHours } from 'date-fns';
import { ILeadsStatus } from './interface';

const formatStatus = (createdAt: string): ILeadsStatus => {
  const createdAtDate = new Date(createdAt);
  const nowDate = new Date();
  const hoursDiff = differenceInHours(nowDate, createdAtDate);

  if (hoursDiff <= 2) {
    return 'SMOKING';
  }
  if (hoursDiff <= 24) {
    return 'HOT';
  }
  if (hoursDiff <= 48) {
    return 'WARM';
  }
  return 'COOL';
};

const utils = {
  formatStatus
};

export default utils;
