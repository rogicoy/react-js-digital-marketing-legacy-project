/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

// project import
import MainCard, { MainCardProps } from 'ui-component/cards/MainCard';

// style constant
const useStyles = makeStyles<Theme, { maxWidth: string }>((theme) => ({
  card: {
    maxWidth: ({ maxWidth }) => maxWidth,
    borderRadius: '59px',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '400px'
    }
  },
  content: {
    padding: `90px 68px !important`,
    [theme.breakpoints.down('lg')]: {
      maxWidth: '450px',
      padding: `60px 50px !important`
    },
    [theme.breakpoints.down('sm')]: {
      padding: `52px 28px !important`
    }
  }
}));

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, maxWidth = '550px', ...other }: MainCardProps & { maxWidth?: string }) => {
  const classes = useStyles({ maxWidth });

  return (
    <MainCard className={classes.card} contentClass={classes.content} {...other}>
      {children}
    </MainCard>
  );
};

export default AuthCardWrapper;
