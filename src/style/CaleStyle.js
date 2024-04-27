import { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from './AppTheme';

/**
 * Resembles an office hour block for a specific
 * time period
 * 
 * @param { Object } event 
 * @param { Props } touchableOpacityProps 
 * @returns { ReactElement } An office hour block
 */
export const renderEvent = (event, touchableOpacityProps) => {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  const makeTwoDigits = time => {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  };

  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text
        style={{
          color: currentTheme.primaryColor,
          fontSize: currentTheme.fontSizes.tiny,
          fontFamily: currentTheme.mainFont,
        }}
      >
        {`${event.title} \n\n${makeTwoDigits(event.start.getHours())}:${makeTwoDigits(
          event.start.getMinutes(),
        )}-${makeTwoDigits(event.end.getHours())}:${makeTwoDigits(event.start.getMinutes())}`}
      </Text>
    </TouchableOpacity>
  );
};

export const eventCellTheme = () => {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return {
    palette: {
      primary: {
        main: currentTheme.mainColor,
        contrastText: currentTheme.subColor,
      },
      gray: {
        100: currentTheme.subColor,
        200: currentTheme.subColor,
        300: currentTheme.subColor,
        500: currentTheme.mainColor,
        800: currentTheme.subColor,
      },
    },
    typography: {
      xs: { fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.tiny },
      sm: { fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.small },
      xl: { fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.medium, top: 3 },
      moreLabel: { fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.casual },
    },
  };
};
