/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { FormControlLabel, Radio } from '@material-ui/core';
import { ColorPaletteProps } from 'types';

// ==============================|| CALENDAR COLOR PALETTE ||============================== //

const ColorPalette = ({ color, label, value }: ColorPaletteProps) => (
  <FormControlLabel
    value={value}
    control={
      <Radio
        sx={{
          color,
          '&.Mui-checked': { color }
        }}
      />
    }
    label={label || ''}
    sx={{ pr: label ? 1 : 0 }}
  />
);

export default ColorPalette;
