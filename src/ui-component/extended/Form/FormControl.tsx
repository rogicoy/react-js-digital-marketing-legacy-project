/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Divider, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import MUIFormControl from '@material-ui/core/FormControl';
import { GenericCardProps } from 'types';

// ==============================|| FORM CONTROL ||============================== //

export interface FormControlProps {
  captionLabel?: string;
  currencies?: { value: string; label: string }[];
  formState?: string;
  iconPrimary?: GenericCardProps['iconPrimary'];
  iconSecondary?: GenericCardProps['iconPrimary'];
  placeholder?: string;
  selected?: string;
  textPrimary?: string;
  textSecondary?: string;
}

const FormControl = ({
  captionLabel,
  formState,
  iconPrimary,
  iconSecondary,
  placeholder,
  textPrimary,
  textSecondary
}: FormControlProps) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary!;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const errorState = formState === 'error';

  return (
    <MUIFormControl fullWidth error={errorState}>
      <InputLabel>{captionLabel}</InputLabel>
      <OutlinedInput
        placeholder={placeholder}
        type="text"
        label={captionLabel}
        startAdornment={
          <>
            {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
            {textPrimary && (
              <>
                <InputAdornment position="start">{textPrimary}</InputAdornment>
                <Divider sx={{ height: 28, m: 0.5, mr: 1.5 }} orientation="vertical" />
              </>
            )}
          </>
        }
        endAdornment={
          <>
            {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
            {textSecondary && (
              <>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputAdornment position="end">{textSecondary}</InputAdornment>
              </>
            )}
          </>
        }
      />
    </MUIFormControl>
  );
};

export default FormControl;
