/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type NotificationsApiRequest = {
  data1: string;
  data2: string;
};

export type NotificationsApiResponse = {
  data1: string;
  data2: string;
};

export type NotificationsState = {
  requests: NotificationsApiRequest[];
  response: NotificationsApiResponse[];
  errors: AppError[];
  data1: string;
};
