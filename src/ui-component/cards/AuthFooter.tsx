/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://removed/" target="_blank" underline="hover">
      removed
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://removed/" target="_blank" underline="hover">
      &copy; removed
    </Typography>
  </Stack>
);

export default AuthFooter;
