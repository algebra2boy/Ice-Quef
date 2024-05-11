import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

/**
 * All colors for app theme
 * @enum { color }
 */
const palette = {
  colorWhite: '#ffffff',
  colorGainsboro: '#d9d9d9',
  colorSlateGray: '#737073',
  colorBlack: '#000000',

  colorLightBlue: '#A2CFFE',
  colorDodgerBlue: '#2596ff',
  colorSeaBlue: '#3c89b2',

  colorMintGreen: '#9effc8',
  colorEmeraldGreen: '#02c262',

  colorCoralRed: '#ff8c84',
  colorScarletRed: '#eb4034',
  colorUMassRed: '#971B2F',

  colorTaroPurple: '#cda8ff',
  colorVioletPurple: '#9370DB',
  colorIndigoPurple: '#7e3ee4',

  colorSunshineYellow: '#fcffc7',
  colorGoldenrodOrange: '#fcdb44',
};

/**
 * All app fonts
 * @enum { font }
 */
const fontFamily = {
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
  mainColor: palette.colorSeaBlue,
  bgColor: palette.colorLightBlue,
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
  bgColor: palette.colorMintGreen,
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
  bgColor: palette.colorCoralRed,
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
  bgColor: palette.colorTaroPurple,
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
  bgColor: palette.colorSunshineYellow,
  subColor: palette.colorBlack,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 4,
};

const blackGoldenTheme = {
  mainColor: palette.colorBlack,
  bgColor: palette.colorSlateGray,
  subColor: palette.colorGoldenrodOrange,
  primaryColor: palette.colorWhite,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorScarletRed,
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 5,
};

const umassTheme = {
  mainColor: palette.colorUMassRed,
  bgColor: palette.colorBlack,
  subColor: palette.colorWhite,
  primaryColor: palette.colorSlateGray,
  disableColor: palette.colorGainsboro,
  checkBoxColor: palette.colorEmeraldGreen,
  errorColor: palette.colorCoralRed,
  mainFont: fontFamily.quenda,
  fontSizes: myFontSize,
  index: 6,
};
/* --- End of Official themes --- */

/**
 * All themes included in the release.
 * After you have created a new theme, remember to
 * add the theme you created to this list
 * @list { Theme }
 */
const themes = [
  defaultTheme, 
  greenTheme, 
  redTheme, 
  purpleTheme, 
  yellowTheme, 
  blackGoldenTheme,
  umassTheme
];

export const themeMiniIcon = () => {
  return themes.map(theme => {
    return {
      mainColor: theme.mainColor,
      index: theme.index,
    };
  });
};

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

  const getDirectorUri = () => {
    return FileSystem.documentDirectory + 'files/';
  };

  const getFileUri = () => {
    return getDirectorUri() + 'theme.txt';
  };

  /**
   * Writes index into file directory for persistent storage
   *
   * @param {int} index New theme index
   */
  const writeIndexToThemeFile = async index => {
    const directoryUri = getDirectorUri();
    const fileUri = getFileUri();

    try {
      // Check if the directory exists, create it if it doesn't
      const directoryExists = await FileSystem.getInfoAsync(directoryUri);
      if (!directoryExists.exists) {
        await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        //console.log('Theme text file created successfully!');
      } else {
        //console.log("Theme text file aleady exists.");
      }

      // Write some text to the file
      await FileSystem.writeAsStringAsync(fileUri, index + '', { encoding: 'utf8' });
    } catch (error) {
      console.error('Error creating text file:', error);
    }
  };

  /**
   * Reads the stored theme index from file directory
   *
   * @returns stored theme index
   */
  const readFromThemeFileToGetIndex = async () => {
    const fileUri = getFileUri();
    try {
      // Read the contents of the file
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      return fileContents;
    } catch (error) {
      console.error('Error reading text file:', error);
      return undefined;
    }
  };

  /**
   * Changes the current app theme to the one stored in index
   *
   * @param {int} themeIndex Theme's index
   */
  const changeTheme = themeIndex => {
    setTheme(themes[themeIndex]);

    if (Platform.OS === 'web') return;
    writeIndexToThemeFile(themeIndex);
  };

  /**
   * @Func {Void} Changes the app theme to the one stored in
   * theme file
   */
  const changeToStoredTheme = async () => {
    if (Platform.OS === 'web') return;
    await writeIndexToThemeFile(0);
    await readFromThemeFileToGetIndex().then(index => {
      setTheme(themes[parseInt(index)]);
    });
  };

  const shouldUseUmassIcon = () => {
    return theme.mainColor === umassTheme.mainColor;
  }

  // Change the theme when app is loaded the first time
  useEffect(() => {
    const change = async () => {
      await changeToStoredTheme();
    };

    if (Platform.OS === 'web') return;

    change();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        changeToStoredTheme,
        shouldUseUmassIcon,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
