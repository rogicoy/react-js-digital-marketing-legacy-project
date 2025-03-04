/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { experimentalStyled as styled } from '@material-ui/core/styles';
import { InputLabel as MuiInputLabel, InputLabelProps } from '@material-ui/core';

const BInputLabel = styled((props: MUIInputLabelProps) => <MuiInputLabel {...props} />, {
  shouldForwardProp: (prop) => prop !== 'horizontal'
})(({ theme, horizontal }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: horizontal ? 0 : 8
}));

export interface MUIInputLabelProps extends InputLabelProps {
  horizontal: boolean;
}

const InputLabel = ({ children, horizontal, ...others }: MUIInputLabelProps) => (
  <BInputLabel horizontal={horizontal} {...others}>
    {children}
  </BInputLabel>
);

InputLabel.defaultProps = {
  horizontal: false
};

export default InputLabel;
