/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, Typography } from '@material-ui/core';

// project imports
import MainCard from './MainCard';
import { GenericCardProps } from 'types';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  roundIcon: {
    width: '50px',
    height: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    justifyContent: 'center',
    '& span:first-child': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      opacity: '0.2',
      zIndex: '1'
    },
    '& span': {
      width: '20px',
      height: '20px'
    },
    '& svg': {
      width: '20px',
      height: '20px',
      position: 'relative',
      zIndex: '5'
    }
  }
}));

// ============================|| ROUND ICON CARD ||============================ //

export interface RoundIconCardProps {
  primary: string;
  secondary: string;
  content: string;
  iconPrimary: GenericCardProps['iconPrimary'];
  color: string;
}

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color }: RoundIconCardProps) => {
  const classes = useStyles();

  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <MainCard>
      <Grid container alignItems="center" spacing={0} justifyContent="space-between">
        <Grid item>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5" color="inherit">
                {primary}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3">{secondary}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="inherit">
                {content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.roundIcon}>
            <span style={{ background: color }} />
            <span style={{ color }}>{primaryIcon}</span>
          </div>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RoundIconCard;
