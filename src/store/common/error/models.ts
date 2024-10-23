/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ErrorSource } from './types';

export type AppError = {
  source: ErrorSource;
  code: string;
  resolved?: boolean;
};

export type AppErrorState = {
  systemErrors: AppError[];
  localErrors: AppError[];
};
