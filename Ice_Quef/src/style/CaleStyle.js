import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from './AppTheme';


export const renderEvent = (event, touchableOpacityProps) => {
    const themeManager = React.useContext(ThemeContext);
    const currentTheme = themeManager.theme;

  return (
      <TouchableOpacity 
        {...touchableOpacityProps}
      >
        <Text
          style={{
            color: currentTheme.primaryColor, 
            fontSize: currentTheme.fontSizes.tiny,
            fontFamily: currentTheme.mainFont}}
        >
          {
            `${event.title} \n\n${
              makeTwoDigits(event.start.getHours())}:${
                makeTwoDigits(event.start.getMinutes())}-${
                  makeTwoDigits(event.end.getHours())}:${
                    makeTwoDigits(event.start.getMinutes())}`
          }
        </Text>
      </TouchableOpacity>
  );
}

export const eventCellTheme = () => {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  theme = {
    palette: {
      primary: {
        main: currentTheme.mainColor,
        contrastText: currentTheme.subColor,
      },
      gray: {
        '100': currentTheme.disableColor,
        '200': currentTheme.disableColor,
        '300': currentTheme.disableColor,
        '500': currentTheme.mainColor,
        '800': currentTheme.disableColor,
      },
    },
    typography: {
      xs: {fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.tiny},
      sm: {fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.small},
      xl: {fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.medium, top: 3},
      moreLabel: {fontFamily: currentTheme.mainFont, fontSize: currentTheme.fontSizes.casual},
    }
  }
  return theme;
}

function makeTwoDigits(time) {
  const timeString = `${time}`;
  if (timeString.length === 2) return time
  return `0${time}`
}
