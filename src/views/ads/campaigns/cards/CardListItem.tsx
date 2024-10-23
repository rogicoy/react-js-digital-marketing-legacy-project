/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import helpers from 'utils/helpers';
import { gridSpacing } from 'views/common/constant';
import { ICampaignItem } from '../interface';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Card, Grid, Theme, Typography, Box } from '@material-ui/core';

// project imports
import Chip from 'ui-component/extended/Chip';

// style card
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '16px',
    minHeight: 178,
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
    border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
    '&:hover': {
      borderColor: theme.palette.primary.main
    },
    cursor: 'pointer'
  },
  title: {
    fontWeight: 500,
    fontSize: theme.spacing(2),
    color: theme.typography.h2.color
  },
  label: {
    fontSize: 'inherit',
    fontWeight: 500,
    color: theme.typography.h2.color
  },
  iconsContainer: {
    marginTop: theme.spacing(1),
    visibility: 'hidden',
    '&.show': {
      visibility: 'visible'
    }
  }
}));

const colors: {
  [status: string]: any;
} = {
  ACTIVE: 'success',
  DELETED: 'warning',
  PAUSED: 'orange',
  ARCHIVED: 'warning',
  COMPLETED: 'secondary',
  IN_REVIEW: 'warning'
};

const CardListItem: FC<ICampaignItem> = ({ id, name, objective, social, status, end_date, spent, link }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [, setShowIcons] = useState(false);

  const color = colors[status];

  const handleNavigate = () => {
    if (status === 'IN_REVIEW') return;
    navigate(`/ads/reports/${id}`);
  };

  return (
    <Card
      className={classes.card}
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      onClick={handleNavigate}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {helpers.textLowerCase(objective)}
            </Typography>
            <Chip
              sx={{ textTransform: 'capitalize' }}
              variant="filled"
              chipcolor={color}
              label={status === 'IN_REVIEW' ? 'Submitted' : helpers.textLowerCase(status)}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="body1" className={classes.title}>
              {name}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {status === 'IN_REVIEW' ? (
            <Box display="flex" fontSize={12}>
              <Typography variant="body1" fontSize="inherit">
                This ad has been submitted to your account number. We&apos;ll let you know when it&apos;s ready for review.
              </Typography>
            </Box>
          ) : (
            <>
              <Box display="flex" fontSize={12}>
                <Typography className={classes.label}>End date: &nbsp;</Typography>
                <Typography variant="body1" fontSize="inherit">
                  {end_date ? format(new Date(end_date), 'do LLLL YYY') : '-'}
                </Typography>
              </Box>
              <Box display="flex" fontSize={12}>
                <Typography className={classes.label}>Total Budget Spent: &nbsp;</Typography>
                <Typography variant="body1" fontSize="inherit">
                  <NumberFormat
                    value={helpers.addDecimalZero(spent || 0)}
                    displayType="text"
                    prefix="$"
                    decimalScale={2}
                    thousandSeparator
                  />
                </Typography>
              </Box>
            </>
          )}

          {/* Icons */}
          {/* <Box className={clsx(classes.iconsContainer, { show: showIcons })}>
            <Tooltip title="View Report">
              <IconButton
                size="small"
                onClick={() =>
                  handleNavigate(`/ads/reports/${id}`, {
                    state: {
                      social
                    }
                  })
                }
              >
                <IconChartLine size={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Ad">
              <IconButton size="small" href={link} target="_blank">
                <IconEye size={20} />
              </IconButton>
            </Tooltip>
          </Box> */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardListItem;
