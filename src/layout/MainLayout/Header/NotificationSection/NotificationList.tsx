/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { FC, Fragment } from 'react';
import clsx from 'clsx';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Theme
} from '@material-ui/core';

// assets
import { IconUserPlus } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { INotificationItem } from 'types';
import { formatDistanceToNow } from 'date-fns';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  navContainer: {
    width: '100%',
    minWidth: 330,
    maxWidth: '330px',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '300px'
    }
  },
  listAction: {
    top: '22px'
  },
  actionColor: {
    color: theme.palette.grey[500]
  },

  listItem: {
    padding: 0
  },
  sendIcon: {
    marginLeft: '8px',
    marginTop: '-3px'
  },
  listDivider: {
    marginTop: 0,
    marginBottom: 0
  },
  listChipError: {
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
    height: '24px',
    padding: '0 6px',
    marginRight: '5px'
  },
  listChipWarning: {
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
    height: '24px',
    padding: '0 6px'
  },
  listChipSuccess: {
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
    height: '24px',
    padding: '0 6px'
  },
  listAvatarSuccess: {
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
    borderColor: theme.palette.success.main
  },
  listAvatarError: {
    color: theme.palette.error.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.error.light,
    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
    borderColor: theme.palette.error.main
  },
  listAvatarPrimary: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
    borderColor: theme.palette.primary.main
  },
  listContainer: {
    paddingLeft: '56px'
  },
  uploadCard: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light
  },
  paddingBottom: {
    paddingBottom: '16px'
  },
  itemAction: {
    cursor: 'pointer',
    padding: '16px',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    }
  }
}));

interface INotificationList {
  list: INotificationItem[];
}

const NotificationList: FC<INotificationList> = ({ list }) => {
  const classes = useStyles();

  return (
    <List className={classes.navContainer}>
      {list.map((item) => (
        <Fragment key={item.noticeId}>
          <div className={classes.itemAction}>
            <ListItem alignItems="center" className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  className={clsx({
                    [classes.listAvatarSuccess]: item.noticeType === 'SUCCESS',
                    [classes.listAvatarError]: item.noticeType === 'ERROR'
                  })}
                >
                  <IconUserPlus stroke={1.5} size="1.3rem" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">{item.title}</Typography>} />
              <ListItemSecondaryAction className={classes.listAction}>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                      {formatDistanceToNow(new Date(item.timestamp))} ago
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className={classes.listContainer}>
              <Grid item xs={12} className={classes.paddingBottom}>
                <Typography variant="subtitle2">{item.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Button component={Link} to={item.cta} variant="contained" size="small" disableElevation>
                      View
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.listDivider} />
        </Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
