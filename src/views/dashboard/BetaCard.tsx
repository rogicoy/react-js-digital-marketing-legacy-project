/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import SubCard from 'ui-component/cards/SubCard';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    '& .MuiCardHeader-root .MuiTypography-root': {
      fontSize: '1.25rem',
      color: theme.palette.grey[900]
    }
  }
}));

const BetaCard = () => {
  const classes = useStyles();

  return (
    <SubCard title="What is Beta?" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ color: 'common.black', fontWeight: 500 }}>The dress rehearsal before the big night.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Beta is the second phase of our product release. We’ve dreamed big and now it’s time to share that dream with our community!
            <br />
            <br />
            Imagine this like a dress rehearsal, we’re 90% ready for showtime but need an audience to help iron out that final 10%. It’s a
            chance for us to work out the final touches with friendly folk before taking it centre stage.
          </Typography>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default BetaCard;
