/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui imports
import { makeStyles } from '@material-ui/styles';
import { Button, Card, Grid, Theme, Typography, Box } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';

// project imports
import FacebookSvgIcon from 'assets/images/icons/fb-new.png';
import GoogleSvgIcon from 'assets/images/icons/google-ads.svg';
import IntagramSvgIvon from 'assets/images/icons/ig-new.png';
import { gridSpacing } from 'views/common/constant';
import { IAdItem } from '../interface';

// style card
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '16px',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
    border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  },
  title: {
    fontWeight: 500,
    fontSize: theme.spacing(2),
    color: theme.typography.h2.color
  },
  logo: {
    height: '40px'
  }
}));

// icon constant
const icons: {
  [social: string]: any;
} = {
  google: GoogleSvgIcon,
  facebook: FacebookSvgIcon,
  instagram: IntagramSvgIvon
};

const CardListItem = ({ title, subtitle, socials, description, link }: IAdItem) => {
  const classes = useStyles();

  const socialIcons = socials.map((social) => ({
    src: icons[social],
    alt: social
  }));

  return (
    <Card className={classes.card}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            {socialIcons.map((socialIcon, index) => (
              <img
                className={classes.logo}
                src={socialIcon.src}
                alt={socialIcon.alt}
                style={{
                  ...(index > 0 && { transform: 'translateX(-8px)' }),
                  ...(socialIcon.alt === 'instagram' && { margin: '-4px', height: '40px' })
                }}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="body1" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="body1" fontSize="inherit">
              {description}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Button component={Link} to={link} variant="outlined" sx={{ width: '100%' }}>
              Start
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardListItem;
