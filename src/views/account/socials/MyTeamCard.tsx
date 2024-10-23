/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AvatarGroup, Card, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Avatar from 'ui-component/extended/Avatar';

// assets
import duncan from 'assets/images/users/duncan.png';
import adrian from 'assets/images/users/adrian.png';
import dani from 'assets/images/users/dani.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2.5),
    width: 260,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.deepPurple[400]
  }
}));

const MyTeamCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container spacing={2.5}>
        <Grid item>
          <Typography variant="h4" sx={{ color: 'inherit' }} gutterBottom>
            We’re here to help
          </Typography>
          <Typography variant="h6" sx={{ color: 'inherit' }} gutterBottom>
            Book a 15min call with our team to get started on the right foot.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs display="flex">
              <AvatarGroup max={3}>
                <Avatar alt="Duncan" src={duncan} />
                <Avatar alt="Adrian" src={adrian} />
                <Avatar alt="Dani" src={dani} />
              </AvatarGroup>
            </Grid>
            <Grid item xs="auto">
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-1b428d58-d150-4cde-9d30-534fb02a5aec"><span class="hs-cta-node hs-cta-1b428d58-d150-4cde-9d30-534fb02a5aec" id="hs-cta-1b428d58-d150-4cde-9d30-534fb02a5aec"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://removed" target="_blank" rel="noopener"><img class="hs-cta-img" id="hs-cta-img-1b428d58-d150-4cde-9d30-534fb02a5aec" style="border-width:0px;" src="https://removed"  alt="We’re here to help"/></a></span><script charset="utf-8" src="https://removed"</script><script> type="text/javascript"> hbspt.cta.load(20889721, '1b428d58-d150-4cde-9d30-534fb02a5aec', {"useNewLoader":"true","region":"na1"}); </script></span><!-- end HubSpot Call-to-Action Code -->`
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MyTeamCard;
