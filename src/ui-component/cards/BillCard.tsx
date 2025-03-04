/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

// project imports
import { GenericCardProps } from 'types';

// assets
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';

// ==============================|| BILL CARD ||============================== //

export interface BillCardProps extends GenericCardProps {
  link: string;
  bg: string;
}

const BillCard = ({ primary, secondary, link, color, bg }: BillCardProps) => {
  const theme = useTheme();
  return (
    <Card sx={{ borderLeft: '10px solid', borderColor: color, background: bg }}>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: theme.palette.grey[700] }}>
              {primary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ fontWeight: 500, mb: 1.5, color: theme.palette.grey[800] }}>
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              disableElevation
              disableRipple
              component={Link}
              to="#"
              sx={{
                color,
                p: 0,
                '&:hover': { bgcolor: 'transparent' }
              }}
              endIcon={<ArrowRightAltRoundedIcon />}
            >
              {link}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BillCard;
