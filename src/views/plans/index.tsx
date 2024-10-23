/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography
} from '@material-ui/core';
import { gridSpacing } from 'views/common/constant';
import CheckIcon from 'assets/images/icons/check.svg';
import GoogleAdsIcon from 'assets/images/icons/google-ads.svg';

// style card
const useStyles = makeStyles(() => ({
  container: {
    margin: '0 auto',
    paddingTop: 60,
    paddingBottom: 60,
    maxWidth: 1000
  },
  subHeading: {
    margin: '40px auto 0',
    maxWidth: 600,
    fontWeight: 'normal'
  },
  switchContainer: {
    marginTop: 40,
    justifyContent: 'center'
  },
  switchLabel: {
    fontWeight: 'bold',
    color: '#212121'
  },
  switch: {
    margin: '0 16px !important',
    padding: 10,
    transform: 'scale(1.5)'
  },
  switchThumb: {
    color: '#9618f7 !important'
  },
  switchTrack: {
    border: '1px solid #cccccc',
    borderRadius: 9,
    backgroundColor: '#ffffff !important'
  },
  pricingCardsContainer: {
    marginTop: 44
  },
  pricingCardHeader: {
    padding: '32px 16px'
  },
  pricingCardLabel: {
    fontWeight: 'bold',
    color: '#212121'
  },
  pricingCardHeading: {
    marginTop: 20
  },
  pricingCardContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    borderTop: '1px solid #DDDDDD'
  },
  pricingCardContentDescription: {
    minHeight: 40
  },
  pricingCardListItem: {
    padding: '8px 4px'
  },
  pricingCardActions: {
    justifyContent: 'center'
  },
  adOns: {
    marginTop: 60
  },
  adOnsDescription: {
    marginTop: 20,
    maxWidth: 600,
    fontWeight: 'normal'
  },
  adOnsContent: {
    marginTop: 52
  },
  adOnsCard: {
    width: 340,
    padding: 16
  },
  adOnsCardContent: {
    marginTop: 20,
    padding: 0,
    minHeight: 80
  },
  adOnsCardActions: {
    justifyContent: 'flex-end',
    padding: 0
  },
  adOnsCardActionsButton: {
    padding: 0
  }
}));

const Plans = () => {
  const classes = useStyles();
  const [pricePlan, setPricePlan] = useState(false);

  const handleSwitchToggle = (e: any) => {
    setPricePlan(e.target.checked);
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h1" align="center">
        Pricing Plans
      </Typography>
      <Typography variant="h3" component="h2" align="center" className={classes.subHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" className={classes.switchContainer}>
        <Typography className={classes.switchLabel}>Monthly</Typography>
        <Switch
          classes={{ root: classes.switch, thumb: classes.switchThumb, track: classes.switchTrack }}
          checked={pricePlan}
          onChange={handleSwitchToggle}
        />
        <Typography className={classes.switchLabel}>Yearly</Typography>
      </Stack>
      <Grid container spacing={gridSpacing} className={classes.pricingCardsContainer}>
        <Grid item xs={12} sm={12} lg={4}>
          <Card>
            <Box className={classes.pricingCardHeader}>
              <Typography className={classes.pricingCardLabel}>Scheduler</Typography>
              <Typography variant="h1" component="h4" className={classes.pricingCardHeading}>
                FREE
              </Typography>
            </Box>
            <CardContent className={classes.pricingCardContent}>
              <Typography className={classes.pricingCardContentDescription}>Our scheduler is free. Forever.</Typography>
              <List dense>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Schedule posts across facebook, instagram, linkedin and twitter." />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Store images and videos in your own content library" />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="View your posts on a calendar with monthly, weekly and daily views." />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className={classes.pricingCardActions}>
              <Button variant="contained">Choose Scheduler</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Card>
            <Box className={classes.pricingCardHeader}>
              <Typography className={classes.pricingCardLabel}>Organic Insights</Typography>
              <Typography variant="h1" component="h4" className={classes.pricingCardHeading}>
                {!pricePlan ? '$29' : '$310'}
                <Typography variant="h1" component="span" sx={{ color: '#999999' }}>
                  /{!pricePlan ? 'pm' : 'pa'}
                </Typography>
              </Typography>
            </Box>
            <CardContent className={classes.pricingCardContent}>
              <Typography className={classes.pricingCardContentDescription}>View reports on your organic social content.</Typography>
              <List dense>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Everything in the free package, plus detailed reports on your posts" />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Instagram, Facebook, Linkedin and Twitter audience insights." />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Identify top performing posts and learn what your followers love." />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className={classes.pricingCardActions}>
              <Button variant="contained">Buy Insights Package</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Card>
            <Box className={classes.pricingCardHeader}>
              <Typography className={classes.pricingCardLabel}>Facebook and Instagram Ads</Typography>
              <Typography variant="h1" component="h4" className={classes.pricingCardHeading}>
                {!pricePlan ? '$99' : '$1069'}
                <Typography variant="h1" component="span" sx={{ color: '#999999' }}>
                  /{!pricePlan ? 'pm' : 'pa'}
                </Typography>
              </Typography>
            </Box>
            <CardContent className={classes.pricingCardContent}>
              <Typography className={classes.pricingCardContentDescription}>
                Create and execute ads on Facebook and Instagram through our simple ads builder
              </Typography>
              <List dense>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Everything in Organic Insights, plus the ability to create and execute you own facebook ad campaigns" />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Detailed campaign reports." />
                </ListItem>
                <ListItem className={classes.pricingCardListItem}>
                  <ListItemIcon>
                    <img src={CheckIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Access to REMOVED curated audeinces for maximum impact." />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className={classes.pricingCardActions}>
              <Button variant="contained">Buy Ads Package</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box className={classes.adOns}>
        <Typography variant="h2" component="h3">
          Ad ons - {!pricePlan ? '$49' : '$40'}
          <Typography variant="h2" component="span" sx={{ color: '#999999' }}>
            /pm
          </Typography>
        </Typography>
        <Typography variant="h4" className={classes.adOnsDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Box className={classes.adOnsContent}>
          <Card className={classes.adOnsCard}>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={GoogleAdsIcon} width={40} />
              <Typography variant="h3" component="h4">
                Google Ads
              </Typography>
            </Stack>
            <CardContent className={classes.adOnsCardContent}>
              <Typography>Create and execute Google Ads through our simple ads builder.</Typography>
            </CardContent>
            <CardActions className={classes.adOnsCardActions}>
              <Button className={classes.adOnsCardActionsButton}>Buy now</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Plans;
