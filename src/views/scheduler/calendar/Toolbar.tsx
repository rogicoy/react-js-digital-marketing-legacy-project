/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ISocialType, ISocialMenuScheduler } from 'types';
import useAuth from 'hooks/useAuth';
import timezones from 'views/common/timezones';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  GridProps,
  Theme,
  SwitchUnstyled
} from '@material-ui/core';

// third-party
import { format } from 'date-fns';

// assets
import { IconChevronLeft, IconChevronRight, IconLayoutGrid, IconTemplate, IconLayoutList, IconListNumbers } from '@tabler/icons';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// project import
import UnstyledSwitch from 'ui-component/UnstyledSwitch';
import HtmlTooltip from 'ui-component/HtmlTooltip';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  socialButtons: {
    border: 'none',
    background: 'none',
    cursor: 'pointer'
  },
  socialIcons: {
    width: '35px',
    height: '35px',
    display: 'block'
    // margin: 'auto'
  }
}));

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: IconLayoutGrid
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: IconTemplate
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: IconLayoutList
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: IconListNumbers
  }
];

// ==============================|| CALENDAR TOOLBAR ||============================== //

export interface ToolbarProps {
  date: number | Date;
  view: string;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onChangeView: (s: string) => void;
  onSetSocial: (x: ISocialType) => void;
  activeSocials: ISocialType[];
  menuItems: ISocialMenuScheduler[];
  sx?: GridProps['sx'];
}

const Toolbar: FC<ToolbarProps> = ({
  date,
  view,
  onClickNext,
  onClickPrev,
  onClickToday,
  onChangeView,
  onSetSocial,
  activeSocials,
  menuItems,
  sx,
  ...others
}) => {
  const classes = useStyles();

  const { user } = useAuth();

  const memoTimezone = useMemo(() => {
    let timezone;
    if (user?.business?.timezone) {
      const tz = timezones.find((item) => item.value === user?.business?.timezone);
      timezone = tz?.text;
    }

    return timezone;
  }, [user]);

  return (
    <Grid alignItems="center" container {...others} sx={{ pb: 3 }}>
      <Grid item md={4} sx={{ justifyContent: 'start', display: 'flex' }}>
        <Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Filter post</Typography>
            <HtmlTooltip
              title={<div style={{ color: '#616161' }}>Choose what you see on the calendar by turning each platform on or off</div>}
            >
              <InfoOutlinedIcon
                sx={{
                  width: 20,
                  height: 20,
                  cursor: 'pointer'
                }}
              />
            </HtmlTooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems
              .filter((item: ISocialMenuScheduler) => !item.disabled)
              .sort((a: ISocialMenuScheduler, b: ISocialMenuScheduler) => a.order - b.order)
              .map((item: ISocialMenuScheduler, index: number) => (
                <Box key={index}>
                  <Box onClick={() => !item.disabled && onSetSocial(item.social)} sx={{ cursor: 'pointer' }}>
                    <div>
                      <img
                        src={item.icon}
                        alt="Social icon"
                        className={classes.socialIcons}
                        style={{
                          filter: !activeSocials.includes(item.social) || item.disabled ? 'grayscale(100)' : 'unset'
                        }}
                      />
                    </div>
                    <div>
                      <SwitchUnstyled
                        component={UnstyledSwitch}
                        checked={activeSocials.includes(item.social) && !item.disabled}
                        // disabled={item.disabled}
                      />
                    </div>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton onClick={onClickPrev}>
              <IconChevronLeft />
            </IconButton>
            <Typography variant="h3" color="textPrimary">
              {format(date, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={onClickNext}>
              <IconChevronRight />
            </IconButton>
          </Stack>

          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="subtitle1">Timezone</Typography>
            <HtmlTooltip
              title={
                <div style={{ color: '#616161' }}>
                  Your calendar is set to {memoTimezone}. Not Right? Update your timezone in{' '}
                  <Link to="/account/businessdetails">Business Settings</Link>
                </div>
              }
            >
              <InfoOutlinedIcon
                sx={{
                  width: 20,
                  height: 20,
                  cursor: 'pointer'
                }}
              />
            </HtmlTooltip>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ justifyContent: 'end', display: 'flex', alignSelf: 'start' }}>
        <Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Calendar view</Typography>
            <HtmlTooltip title={<div style={{ color: '#616161' }}>View your calendar by month, week, day or list</div>}>
              <InfoOutlinedIcon
                sx={{
                  width: 20,
                  height: 20,
                  cursor: 'pointer'
                }}
              />
            </HtmlTooltip>
          </Box>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            {viewOptions.map((viewOption) => {
              const Icon = viewOption.icon;
              return (
                <Tooltip title={viewOption.label} key={viewOption.value}>
                  <Button
                    disableElevation
                    variant={viewOption.value === view ? 'contained' : 'outlined'}
                    onClick={() => onChangeView(viewOption.value)}
                  >
                    <Icon stroke="2" size="1.3rem" />
                  </Button>
                </Tooltip>
              );
            })}
          </ButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
