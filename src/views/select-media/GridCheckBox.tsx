/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Checkbox, styled } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { GridCheckBoxProps } from './types';

const InactiveCheckBox = styled('span')((style) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  border: `2px solid ${style.theme.palette.grey[500]}`,
  backgroundColor: style.theme.palette.primary.light,
  'input:hover ~ &': {
    backgroundColor: style.theme.palette.primary.light
  }
}));

const ActiveCheckBox = styled(InactiveCheckBox)((style) => ({
  border: 'none',
  '&:before': {
    display: 'block',
    borderRadius: 3,
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://removed' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
    backgroundColor: style.theme.palette.primary.main,
    'input:hover ~ &': {
      backgroundColor: style.theme.palette.primary.main
    }
  }
}));

const GridCheckBox = (props: GridCheckBoxProps) => {
  const { onClick, checked } = props;
  const theme = useTheme();

  return (
    <Checkbox
      checked={checked}
      icon={<InactiveCheckBox theme={theme} />}
      checkedIcon={<ActiveCheckBox theme={theme} />}
      onClick={() => onClick()}
    />
  );
};

export default GridCheckBox;
