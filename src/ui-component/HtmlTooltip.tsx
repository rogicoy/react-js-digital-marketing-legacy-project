/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

import { styled } from '@material-ui/core/styles';
import { Tooltip, TooltipProps, tooltipClasses } from '@material-ui/core';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} sx={{ zIndex: '99999 !important' }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    padding: '15px',
    maxWidth: 250,
    boxShadow: '4px 3px 15px 1px #808080'
  }
}));

export default HtmlTooltip;
