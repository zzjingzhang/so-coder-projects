export interface ColorPalette {
  common: {
    black: string;
    white: string;
  };
  background: {
    default: string;
    paper: string;
    surface: string;
  };
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

export interface PaletteGroup {
  name: string;
  label: string;
  fields: {
    key: string;
    label: string;
    color: string;
  }[];
}
