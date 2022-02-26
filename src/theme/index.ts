import _ from 'lodash';
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core';
import type { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';
import type { Shadows as MuiShadows } from '@material-ui/core/styles/shadows';
import type {
  Palette as MuiPalette,
  TypeBackground as MuiTypeBackground
} from '@material-ui/core/styles/createPalette';
import { THEMES } from 'src/constants';
import { strongShadows } from './shadows';
import typography from './typography';

const background = "/static/images/background.jpg";

interface TypeBackground extends MuiTypeBackground {
  dark: string;
}

interface Palette extends MuiPalette {
  background: TypeBackground;
}

export interface Theme extends MuiTheme {
  name: string;
  palette: Palette;
}

type Direction = 'ltr' | 'rtl';

interface ThemeConfig {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  theme?: string;
}

interface ThemeOptions { 
  name?: string;
  direction?: Direction;
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: MuiShadows;
}

const baseOptions: ThemeOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
};

const themesOptions: ThemeOptions[] = [
  {
    name: THEMES.ONE_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: `url(${background}) 100% 100% no-repeat`,
        paper: '#282C34',
      },
      primary: {
        main: '#8a85ff'
      },
      secondary: {
        main: '#8a85ff'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      }
    },
    shadows: strongShadows
  },
];

export const createTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge(
      {},
      baseOptions,
      themeOptions,
      { direction: config.direction }
    )
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme as Theme;
}
