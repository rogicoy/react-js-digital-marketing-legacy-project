/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export interface IDateRange {
  from: Date | null;
  to: Date | null;
  fromFormatted?: string;
  toFormatted?: string;
}

export interface IDateRangeOptions {
  dateFormatter: string;
}

export type IDatePreset =
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_14_days'
  | 'last_30_days'
  | 'this_week'
  | 'last_week'
  | 'this_month'
  | 'last_month'
  | 'custom'
  | 'all_time';

export interface IDateRangePickerProps {
  value: IDatePreset;
  defaultRange?: IDateRange;
  options?: IDateRangeOptions;
  onChange: (value: IDatePreset, range: IDateRange) => void;
}
