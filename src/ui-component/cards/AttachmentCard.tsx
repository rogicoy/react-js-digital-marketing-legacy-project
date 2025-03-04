/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { gridSpacing } from 'views/common/constant';

// assets
import DownloadForOfflineTwoToneIcon from '@material-ui/icons/DownloadForOfflineTwoTone';

const backImage = require.context('assets/images/profile', true);

// ==============================|| ATTACHMENT CARD ||============================== //

export interface AttachmentCardProps {
  title: string;
  image: string;
}

const AttachmentCard = ({ title, image }: AttachmentCardProps) => {
  const theme = useTheme();
  const backProfile = image && backImage(`./${image}`).default;

  return (
    <Card sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'grey.100' }}>
      <CardMedia component="img" image={backProfile} title="Slider5 image" />
      <CardContent sx={{ p: 2, pb: '16px !important' }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs zeroMinWidth>
            <Typography variant="h5" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <DownloadForOfflineTwoToneIcon sx={{ cursor: 'pointer' }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttachmentCard;
