/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { styled } from '@material-ui/core/styles';
import { switchUnstyledClasses } from '@material-ui/core';

const grey = {
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#6F7E8C'
};

const UnstyledSwitch = styled('span')(
  () => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 31px;
  height: 15px;
  margin: 10px 0;
  cursor: pointer;


  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: #ffffff;
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 1px solid ${grey[400]};
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 11px;
    height: 11px;
    top: 2.25px;
    left: 3px;
    border-radius: 16px;
    background-color: ${grey[400]};
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
        left: 17px;
        background-color: #9618f7;
    }

    .${switchUnstyledClasses.track} {
      background: #ffffff;
      border: 1px solid #9618f7;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);

export default UnstyledSwitch;
