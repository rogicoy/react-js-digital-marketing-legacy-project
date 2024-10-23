/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Grid, Theme, Typography, Link as MaterialLink } from '@material-ui/core';
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

const FeedbackCard = () => {
  const classes = useStyles();

  return (
    <SubCard title="Feedback" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ color: 'common.black', fontWeight: 500 }}>Beta users are pioneers.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Boldly going where no one has gone before! We’re super grateful that you’re on board to help us, help you.
            <br />
            <br />
            If you notice anything that doesn&apos;t look right or work the way that you think it should, we’d love to know about it. Feel
            free to email me directly at{' '}
            <MaterialLink href="mailto: removed" sx={{ color: 'common.black', textDecoration: 'none' }}>
              removed
            </MaterialLink>{' '}
            with any thoughts, questions or feedback.
          </Typography>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default FeedbackCard;
