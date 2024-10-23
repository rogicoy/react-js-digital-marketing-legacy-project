/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { add, startOfMonth, endOfMonth, format, startOfDay, startOfWeek, endOfWeek, endOfDay } from 'date-fns';
import { IDateRangeOptions, IDateRange, IDatePreset, dateRangeOptions } from '.';

const nullRange = {
  from: null,
  to: null
};

const getDateRange = (
  presetValue: IDatePreset,
  options: IDateRangeOptions = dateRangeOptions,
  customValues: IDateRange = nullRange
): IDateRange => {
  let fromDate;
  let toDate: Date | null = new Date();
  let range: IDateRange = nullRange;

  switch (presetValue) {
    case 'today':
      fromDate = startOfDay(toDate);
      toDate = endOfDay(fromDate);
      break;
    case 'yesterday':
      fromDate = add(toDate, { days: -1 });
      toDate = startOfDay(fromDate);
      break;
    case 'last_7_days':
      fromDate = add(toDate, { days: -7 });
      break;
    case 'last_14_days':
      fromDate = add(toDate, { days: -14 });
      break;
    case 'last_30_days':
      fromDate = add(toDate, { days: -30 });
      break;
    case 'this_week':
      fromDate = startOfWeek(toDate);
      toDate = endOfWeek(fromDate);
      break;
    case 'last_week':
      fromDate = add(startOfWeek(toDate), { weeks: -1 });
      toDate = endOfWeek(fromDate);
      break;
    case 'this_month':
      fromDate = startOfMonth(toDate);
      toDate = endOfMonth(fromDate);
      break;
    case 'last_month':
      fromDate = add(startOfMonth(toDate), { months: -1 });
      toDate = endOfMonth(fromDate);
      break;
    case 'custom':
      fromDate = customValues?.from;
      toDate = customValues?.to;
      break;
    default:
      fromDate = null;
      break;
  }

  range = fromDate
    ? {
        from: fromDate,
        to: toDate
      }
    : {
        from: null,
        to: null
      };

  if (range.from && range.to && options?.dateFormatter) {
    range = {
      ...range,
      fromFormatted: format(range.from, options?.dateFormatter),
      toFormatted: format(range.to, options?.dateFormatter)
    };
  }

  return range;
};

export default getDateRange;
