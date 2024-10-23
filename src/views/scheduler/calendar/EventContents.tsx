/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { format } from 'date-fns';
import { EventContentArg } from '@fullcalendar/react';
import { TablerIcon, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import { socialColors } from 'views/common/constant';
import { ISocialType } from 'types';
import { GetMediaType, GetPostStatus } from 'store/scheduler/models';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';

// components
import HtmlTooltip from 'ui-component/HtmlTooltip';
import Avatar from 'ui-component/extended/Avatar';
import SuccessToolTip from '../tooltip/SuccessTooltip';
import FailedToolTip from '../tooltip/FailedTooltip';

// assets
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const useStyles = makeStyles(() => ({
  popper: { zIndex: 9999 }
}));

// icon constant
const icons: {
  [social: string]: TablerIcon;
} = {
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
  twitter: IconBrandTwitter,
  linkedin: IconBrandLinkedin
};

const EventContents: FC<{ data: EventContentArg }> = ({ data }) => {
  const classes = useStyles();
  const {
    event,
    view: { type }
  } = data;
  const { extendedProps } = event;

  const eventDate = event.start || new Date();
  const social: ISocialType = extendedProps?.platform;
  const status: GetPostStatus = extendedProps?.status;
  const postLink = extendedProps?.link;
  const postErrorMessage = extendedProps?.errorMessage;
  const mediaType: GetMediaType | null = extendedProps?.mediaType;
  const mediaFrame: string = extendedProps?.mediaFrame;
  const description = extendedProps?.description;
  const socialColor = socialColors[social];
  const image: string = extendedProps?.image;
  const Icon = icons[social] as TablerIcon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: type === 'timeGridDay' ? '7px' : 0 }}>
      <img
        src={mediaType === 'IMAGE' ? image : mediaFrame}
        alt="Social"
        style={{
          width: 25,
          height: '100%',
          marginRight: 10,
          filter: status === 'COMPLETED' || status === 'FAILED' || status === 'PUBLISHED' ? 'grayscale(100%)' : ''
        }}
      />
      <Typography style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{format(new Date(eventDate), `hh.mmaaaaa'm'`)}</Typography>
      {(type === 'listWeek' || type === 'timeGridDay') && (
        <Typography style={{ marginLeft: '50px', fontSize: '0.75rem' }}>{description}</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, gap: 0.5 }}>
        {(status === 'COMPLETED' || status === 'PUBLISHED') && (
          <HtmlTooltip title={<SuccessToolTip postLink={postLink || ''} />} className={classes.popper}>
            <CheckCircleOutlinedIcon
              sx={{
                width: 20,
                height: 20
              }}
              htmlColor="#008000"
            />
          </HtmlTooltip>
        )}

        {status === 'FAILED' && (
          <HtmlTooltip title={<FailedToolTip errorMessage={postErrorMessage || ''} social={social} />} className={classes.popper}>
            <InfoOutlinedIcon
              sx={{
                width: 20,
                height: 20
              }}
              htmlColor="#FF0000"
            />
          </HtmlTooltip>
        )}

        <Avatar
          disabled
          color="social"
          socialColor={socialColor}
          sx={{
            width: 20,
            height: 20,
            p: 0.45,
            filter: status === 'COMPLETED' || status === 'FAILED' ? 'grayscale(100%)' : ''
          }}
        >
          <Icon />
        </Avatar>
      </Box>
    </Box>
  );
};

export default EventContents;
