/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { IDatePreset, IDateRangeOptions } from '.';

export const dateRangePresets: {
  label: string;
  value: IDatePreset;
}[] = [
  {
    label: 'Today',
    value: 'today'
  },
  {
    label: 'Yesterday',
    value: 'yesterday'
  },
  {
    label: 'Last 7 days',
    value: 'last_7_days'
  },
  {
    label: 'Last 14 days',
    value: 'last_14_days'
  },
  {
    label: 'Last 30 days',
    value: 'last_30_days'
  },
  {
    label: 'This week',
    value: 'this_week'
  },
  {
    label: 'Last week',
    value: 'last_week'
  },
  {
    label: 'This month',
    value: 'this_month'
  },
  {
    label: 'Last month',
    value: 'last_month'
  },
  {
    label: 'Custom',
    value: 'custom'
  }
];

export const dateRangeOptions: IDateRangeOptions = {
  dateFormatter: 'yyyy-MM-dd'
};
