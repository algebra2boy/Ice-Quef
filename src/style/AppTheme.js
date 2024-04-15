import { useState } from 'react';
import { createContext } from 'react';

/**
 * All colors for app theme
 * @enum { color }
 */
const palette = {
  colorDodgerblue: '#2596ff',
  colorLightblue: '#A2CFFE',
  colorWhite: '#fff',
  colorGainsboro: '#d9d9d9',
  colorBlack: '#000',
  colorEmeraldGreen: '#02c262',
  colorScarletRed: '#eb4034',
  colorVioletPurple: '#9370DB',
  colorSunshineYellow: '#fcffc7',
  colorGoldenrodOrange: '#fcdb44',
};

/**
 * All app fonts
 * @enum { font }
 */
const fontFamily = {
  balooBhai: 'BalooBhai-Regular',
  quenda: 'Quenda-Medium',
};

/**
 * All font sizes
 * @enum { int }
 */
const myFontSize = {
  large: 30,
  casual: 24,
  medium: 20,
  small: 18,
  tiny: 12,
};

/* --- Official themes --- */
const defaultTheme = {
  mainColor: palette.colorLightblue,
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
  mainFont: fontFamily.quenda,
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
  mainFont: fontFamily.quenda,
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
  mainFont: fontFamily.quenda,
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
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 4,
};

const blackGoldenTheme = {
  mainColor: palette.colorBlack,
  subColor: palette.colorGoldenrodOrange,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 5,
};
/* --- End of Official themes --- */

/**
 * All themes included in the release.
 * After you have created a new theme, remember to
 * add the theme you created to this list
 * @list { Theme }
 */
const themes = [defaultTheme, greenTheme, redTheme, purpleTheme, yellowTheme, blackGoldenTheme];

/**
 * Tracks the current theme
 * @Context { Theme }
 */
export const ThemeContext = createContext(themes);

/**
 *
 * @param { ReactElement } components
 * @return { ReactElement } component wrapped with theme context
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  const changeTheme = themeIndex => {
    setTheme(themes[themeIndex]);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};
