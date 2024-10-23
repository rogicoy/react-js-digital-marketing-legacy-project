/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { makeStyles, styled } from '@material-ui/styles';
import {
  Theme,
  Box,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
  TextField,
  Popover,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import { DateRangePickerDay, DateRangePickerDayProps, StaticDateRangePicker } from '@material-ui/lab';
import { IDateRangeOptions, IDateRangePickerProps, IDatePreset, dateRangePresets } from '.';
import getDateRange from './getDateRange';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  dateRange: {
    width: 280,
    '& .MuiInputLabel-root': {
      marginTop: '.5rem',
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    '& .MuiSelect-select': {
      paddingBottom: '1rem',
      paddingTop: '2.2rem',
      fontWeight: 'bold'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.palette.grey[100],
      borderRadius: '.75rem',
      '&:before': {
        display: 'none'
      }
    }
  },
  presetItem: {
    cursor: 'pointer',
    fontSize: 'inherit',
    '&.selected': {
      color: theme.palette.primary.main
    }
  },
  staticDatePicker: {
    '& > div:first-child': {
      '& > div:nth-child(1)': {
        borderRadius: 12,
        background: '#F6F6F6',
        marginRight: '1rem',
        borderRight: 'none'
      },
      '& > div:nth-child(2)': {
        borderRadius: 12,
        background: '#F6F6F6'
      }
    },
    '& .MuiDateRangePickerDay-rangeIntervalDayHighlight': {
      backgroundColor: '#ede7f6'
    },
    '& .MuiTypography-caption': {
      fontWeight: 700
    },
    '& .MuiTypography-root': {
      color: '#111936'
    }
  }
}));

const defaultOptions: IDateRangeOptions = {
  dateFormatter: 'yyyy-MM-dd'
};

const DateRangePicker: FC<IDateRangePickerProps> = (props) => {
  const { value, defaultRange, options = defaultOptions, onChange } = props;
  const classes = useStyles();

  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<IDatePreset>(value);
  // const [dValue, setDValue] = React.useState<Date[]>([
  //   defaultRange?.from ? new Date(defaultRange.from) : new Date(),
  //   defaultRange?.to ? new Date(defaultRange.to) : new Date()
  // ]);
  const [dValue, setDValue] = React.useState<Date[]>([new Date(), new Date()]);

  const handleClick = (event: any) => {
    setSelectedPreset(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickPreset = (selected: IDatePreset) => {
    const newDValue = getDateRange(selected, options);
    if (newDValue.from && newDValue.to) {
      setDValue([newDValue.from, newDValue.to]);
    }
    setSelectedPreset(selected);
  };

  const handleDayClick = () => {
    setSelectedPreset('custom');
  };

  const handleUpdate = () => {
    const customValues = {
      from: dValue[0],
      to: dValue[1]
    };
    const range = getDateRange(selectedPreset, options, customValues);
    onChange(selectedPreset, range);
    handleClose();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {};

  const renderWeekPickerDay = (date: Date, dateRangePickerDayProps: DateRangePickerDayProps<Date>) => (
    <DateRangePickerDayCustom {...dateRangePickerDayProps} onClick={handleDayClick} />
  );

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (defaultRange?.from && defaultRange?.to) {
      setDValue([defaultRange.from, defaultRange.to]);
    }
  }, [defaultRange]);

  return (
    <Box>
      <FormControl variant="filled" className={classes.dateRange}>
        <InputLabel ref={inputRef} onClick={handleClick}>
          Date Range:
        </InputLabel>
        <Select
          key={String(open)}
          displayEmpty
          id="dateRange"
          open={open}
          value={value}
          onChange={handleSelectChange}
          onOpen={handleClick}
          onClose={handleClose}
          renderValue={() => dateRangePresets.find((e) => e.value === value)?.label}
          MenuProps={{
            sx: { display: 'none' }
          }}
        />
      </FormControl>
      <Popover
        open={open}
        anchorEl={inputRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{ zIndex: 9999999999 }}
        PaperProps={{
          sx: { width: 820, p: 2 }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StaticDateRangePicker
                  className={classes.staticDatePicker}
                  displayStaticWrapperAs="desktop"
                  value={dValue as any}
                  maxDate={new Date()}
                  renderDay={renderWeekPickerDay}
                  onChange={(newValue) => {
                    setDValue(newValue as any);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontSize: 12, fontWeight: 500, color: 'common.black' }}>
                    {dValue[0] ? format(dValue[0], 'do LLL YYY') : ''} - {dValue[1] ? format(dValue[1], 'do LLL YYY') : ''}
                  </Typography>
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Presets */}
          <Grid item xs={2}>
            <Box sx={{ fontSize: '1rem', color: 'common.black' }}>
              <Typography sx={{ mt: 3, mb: 4, fontWeight: 500, fontSize: 'inherit' }}>Date Presets</Typography>
              <Grid container spacing={1} direction="column">
                {dateRangePresets.map((item) => (
                  <Grid key={item.value} item>
                    <Typography
                      className={clsx(classes.presetItem, { selected: item.value === selectedPreset })}
                      onClick={() => handleClickPreset(item.value)}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Popover>
    </Box>
  );
};

const DateRangePickerDayCustom = styled(DateRangePickerDay)(
  ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting }: any) => ({
    ...(isHighlighting && {
      borderRadius: 0
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%'
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%'
    })
  })
) as React.ComponentType<DateRangePickerDayProps<Date>>;

export default DateRangePicker;
