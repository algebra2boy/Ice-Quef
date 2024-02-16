import * as React from 'react';
import { createContext } from 'react';

const palette = {
  colorDodgerblue: '#2596ff',
  colorWhite: '#fff',
  colorGainsboro: '#d9d9d9',
  colorBlack: '#000',
  colorEmeraldGreen: '#02c262',
  colorScarletRed: '#eb4034',
  colorVioletPurple: '#9370DB',
  colorSunshineYellow: '#fcffc7',
  colorGoldenrodOrange: '#fcdb44',
};

const fontFamily = {
  balooBhai: 'BalooBhai-Regular',
  quenda: 'Quenda-Medium',
};

const myFontSize = {
  large: 30,
  casual: 24,
  medium: 20,
  small: 18,
  tiny: 12,
};

/* You can create a new theme below */
const defaultTheme = {
  mainColor: palette.colorEmeraldGreen,
  subColor: palette.colorBlack,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 0,
};

const greenTheme = {
  mainColor: palette.colorEmeraldGreen,
  subColor: palette.colorBlack,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorBlack,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.balooBhai,
  fontSizes: myFontSize,
  index: 1,
};

const redTheme = {
  mainColor: palette.colorScarletRed,
  subColor: palette.colorBlack,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorBlack,
  errorColor: palette.colorEmeraldGreen,
  mainFont: fontFamily.balooBhai,
  fontSizes: myFontSize,
  index: 2,
};

const purpleTheme = {
  mainColor: palette.colorVioletPurple,
  subColor: palette.colorBlack,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.balooBhai,
  fontSizes: myFontSize,
  index: 3,
};

const yellowTheme = {
  mainColor: palette.colorGoldenrodOrange,
  subColor: palette.colorBlack,
  primaryColor: palette.colorSunshineYellow,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.balooBhai,
  fontSizes: myFontSize,
  index: 4,
};

/* Remember to add the theme you created to this array */
export const themes = [defaultTheme, greenTheme, redTheme, purpleTheme, yellowTheme];

export const ThemeContext = createContext(themes);
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(themes[0]);

  const changeTheme = themeIndex => {
    setTheme(themes[themeIndex]);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};
