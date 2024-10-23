/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';

// project imports
import userAvatarImg from 'assets/images/users/avatar-1.png';
import adPreviewFooterImg from 'assets/images/etc/ad-preview-footer.png';

const useStyles = makeStyles(() => ({
  adPreview: {
    width: '300px',
    minHeight: '520px',
    border: '1px solid #D8D8D8'
  },
  adPreviewHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px'
  },
  adPreviewHeaderDetails: {
    marginLeft: '8px'
  },
  adPreviewPageName: {
    fontWeight: 'bold'
  },
  adPreviewSponsored: {
    color: '#757575'
  },
  adPreviewPrimaryText: {
    padding: '0 8px'
  },
  adPreviewImage: {
    marginTop: '8px',
    width: '100%',
    height: '320px'
  },
  adPreviewContent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: '#E8EAEF'
  },
  adPreviewDisplayLink: {
    width: '160px',
    color: '#757575',
    textTransform: 'uppercase',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  adPreviewHeadline: {
    marginTop: '2px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  adPreviewDescription: {
    marginTop: '4px',
    color: '#757575'
  },
  adPreviewCallToActionWrapper: {
    flexShrink: '0',
    marginTop: '8px',
    paddingLeft: '8px'
  },
  adPreviewCallToAction: {
    padding: '4px 8px',
    border: '1px solid #757575',
    borderRadius: '4px',
    fontSize: '16px',
    textTransform: 'uppercase',
    color: '#757575'
  },
  adPreviewFooter: {
    padding: '8px 0'
  }
}));

interface IAdPreview {
  pageName: string;
  primaryText: string;
  headline: string;
  description: string;
  displayLink: string;
  callToAction: string;
  imageUrl: string;
}

const AdPreview = ({ pageName, primaryText, headline, description, displayLink, callToAction, imageUrl }: IAdPreview) => {
  const classes = useStyles();

  return (
    <Box className={classes.adPreview}>
      <Box className={classes.adPreviewHeader}>
        <img
          src={userAvatarImg}
          style={{
            display: 'block',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            objectFit: 'cover'
          }}
        />
        <Box className={classes.adPreviewHeaderDetails}>
          <Typography className={classes.adPreviewPageName}>{pageName}</Typography>
          <Typography className={classes.adPreviewSponsored}>Sponsored</Typography>
        </Box>
      </Box>
      <Typography className={classes.adPreviewPrimaryText}>{primaryText}</Typography>
      <Box className={classes.adPreviewImage}>
        <img
          src={imageUrl}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            objectFit: 'cover',
            backgroundColor: '#9E9E9E'
          }}
        />
      </Box>
      <Box className={classes.adPreviewContent}>
        <Box>
          <Typography className={classes.adPreviewDisplayLink}>{displayLink}</Typography>
          <Typography className={classes.adPreviewHeadline}>{headline}</Typography>
          <Typography className={classes.adPreviewDescription}>{description}</Typography>
        </Box>
        <Box className={classes.adPreviewCallToActionWrapper}>
          <Box className={classes.adPreviewCallToAction}>{callToAction}</Box>
        </Box>
      </Box>
      <Box className={classes.adPreviewFooter}>
        <img
          src={adPreviewFooterImg}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto'
          }}
        />
      </Box>
    </Box>
  );
};

export default AdPreview;
