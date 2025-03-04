/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteColor {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  export interface TypeText {
    dark: string;
    hint: string;
  }

  interface PaletteOptions {
    orange?: PaletteColorOptions;
    dark?: PaletteColorOptions;
    deepPurple?: PaletteColorOptions;
    icon?: IconPaletteColorOptions;
  }
  interface Palette {
    orange: PaletteColor;
    dark: PaletteColor;
    deepPurple: PaletteColor;
    icon: IconPaletteColor;
  }
}
