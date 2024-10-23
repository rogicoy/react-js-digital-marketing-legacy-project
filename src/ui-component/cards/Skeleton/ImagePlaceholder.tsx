/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import Skeleton from '@material-ui/core/Skeleton';

// ==============================|| SKELETON IMAGE CARD ||============================== //

const ImagePlaceholder = ({ ...others }) => <Skeleton variant="rectangular" {...others} animation="wave" />;

export default ImagePlaceholder;
