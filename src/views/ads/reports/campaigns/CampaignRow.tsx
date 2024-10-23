/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { TableCell, TableRow, Typography, Box, IconButton, Tooltip, Theme, CardMedia } from '@material-ui/core';
import { IconChartLine, IconEye, IconPencil, IconPlayerPause, IconCoin } from '@tabler/icons';
import Chip from 'ui-component/extended/Chip';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import { format } from 'date-fns';
import { CampaignRowProps } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 350,
    '& tr > th:first-child, tr > td:first-child': {
      paddingLeft: 0
    },
    '& td': {
      minWidth: 110,
      color: theme.palette.grey[500]
    }
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  blackBox: {
    width: 280,
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.text.primary
  },
  iconsContainer: {
    visibility: 'hidden',
    '&.show': {
      visibility: 'visible'
    },
    '& .MuiIconButton-root:first-child': {
      marginLeft: -5
    }
  }
}));

const formatDate = (date: string) => (date ? format(new Date(date), 'do LLL yyy') : date);

const CampaignRow = (props: CampaignRowProps) => {
  const classes = useStyles();
  const { report } = props;
  const [useDefaultIcon, setUseDefaultIcon] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const chipValues =
    report.status === 'COMPLETED'
      ? {
          label: 'Completed',
          color: 'secondary'
        }
      : {
          label: 'Active',
          color: 'success'
        };

  const campaignIconStyle = {
    height: '60px',
    width: '60px',
    display: useDefaultIcon ? 'none' : 'block'
  };

  const defaultIconStyle = {
    height: '40px',
    width: '40px',
    margin: '10px',
    display: useDefaultIcon ? 'block' : 'none'
  };

  return (
    <TableRow hover key={report.id} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <TableCell>
        <Box className={classes.blackBox}>
          <CardMedia component="img" sx={campaignIconStyle} src={report.image} alt={report.name} onLoad={() => setUseDefaultIcon(false)} />
          <CardMedia component="img" sx={defaultIconStyle} src={FacebookIcon} alt={report.name} />
          <Box sx={{ ml: 2 }}>
            <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
              {report.name}
            </Typography>
            <Typography gutterBottom className={classes.description}>
              {report.type}
            </Typography>
            <Box className={clsx(classes.iconsContainer, { show: isHovered })}>
              {report.status === 'ACTIVE' && (
                <Tooltip title="Edit Ad">
                  <IconButton size="small">
                    <IconPencil size={20} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="View Report">
                <IconButton size="small" href={`reports/${report.id}`}>
                  <IconChartLine size={20} />
                </IconButton>
              </Tooltip>
              {report.status === 'ACTIVE' && (
                <>
                  <Tooltip title="Pause Ad">
                    <IconButton size="small">
                      <IconPlayerPause size={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Budget">
                    <IconButton size="small">
                      <IconCoin size={20} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Tooltip title="View Ad">
                <IconButton size="small" href={report.link} target="_blank">
                  <IconEye size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{formatDate(report.startDate)}</TableCell>
      <TableCell>{formatDate(report.endDate)}</TableCell>
      <TableCell>{`$ ${report.totalSpent}`}</TableCell>
      <TableCell>{report.impressions}</TableCell>
      <TableCell>{report.clicks}</TableCell>
      <TableCell>{report.reach}</TableCell>
      <TableCell>{report.frequency}</TableCell>
      <TableCell>{report.cpr}</TableCell>
      <TableCell>
        <Chip label={chipValues.label} chipcolor={chipValues.color} />
      </TableCell>
    </TableRow>
  );
};

export default CampaignRow;
