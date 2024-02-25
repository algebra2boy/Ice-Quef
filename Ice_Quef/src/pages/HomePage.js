import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { BasePage } from '../kit/BasePage';
import { ThemeContext } from '../kit/AppTheme';


const renderEvent = (event, touchableOpacityProps) => {
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

const darkTheme= () => {
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

const events = [
  {
    title: truncateText('CS 123, Alexandar', 14),
    start: new Date(2024, 1, 24, 15, 45),
    end: new Date(2024, 1, 24, 16, 45),
  },
  {
    title: 'CS 555, Sulu',
    start: new Date(2024, 1, 25, 17, 0),
    end: new Date(2024, 1, 25, 18, 0),
  },
  {
    title: 'CS 430, Magnet',
    start: new Date(2024, 1, 26, 17, 0),
    end: new Date(2024, 1, 26, 18, 0),
  },
];

export function HomePage({ navigation }) {
  const themedStyles = ThemedStyles();
  const hourStyle = getHourStyle();

  return (
    <BasePage
      components={
        <>
          <View style={{flex: 20}}>
            <Calendar 
              events={events} 
              height={400} 
              mode='3days'
              theme={darkTheme()}
              renderEvent={renderEvent}
              hourStyle={hourStyle}
              showWeekNumber={true}
            />
          </View> 
        </>
      }
    />
  );
}

function makeTwoDigits(time) {
  const timeString = `${time}`;
  if (timeString.length === 2) return time
  return `0${time}`
}

function truncateText(text, length) {
  if (text.length < length) {
    return text;
  }
  return text.substring(0, length);
}

function getHourStyle() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return {
    fontFamily: currentTheme.mainFont,
    fontSize: currentTheme.fontSizes.small,
    color: currentTheme.mainColor
  };
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({

  });
}
