import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { renderEvent, eventCellTheme } from '../../style/CaleStyle';
import * as KolynStyle from '../../style/KolynStyleKit';
import { UserContext } from '../../props/UserInfo';

export function CalendarPageDefault({ registered }) {
  const themedStyles = ThemedStyles();
  const hourStyle = getHourStyle();

  const lst = getRenderList(registered);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('Press to join waitlist.');

  const userManager = React.useContext(UserContext);

  const onPressEvent = (event) => {
    setOpenMenu(true);
    setTitle(event.title);
  };

  const determineMessage = () => {
    if (message == 'Press to join waitlist.') {
      setMessage('Your current position: 4');
    } else {
      setMessage('Press to join waitlist.');
    }
  };

  return (
    <BasePage
      components={
        <>
          <View style={{ flex: 20 }}>
            <Calendar
              events={lst}
              height={400}
              mode="3days"
              theme={eventCellTheme()}
              renderEvent={renderEvent}
              hourStyle={hourStyle}
              showWeekNumber={true}
              onPressEvent={onPressEvent}
            />
            {isOpenMenu && (
              <View style={themedStyles.bottomOverlay}>
                <View style={themedStyles.topOverlay}>
                  <View style={{ bottom: '10%' }}>
                    <TouchableOpacity
                      style={themedStyles.closeMenuBotton}
                      onPress={() => setOpenMenu(false)}
                    >
                      <CrossMark />
                    </TouchableOpacity>

                    <Text style={[themedStyles.waitlistHintLabel]}>
                      {title}
                    </Text>

                    <TouchableOpacity
                      style={themedStyles.waitlistButton}
                      onPress={() => determineMessage()}
                    >
                      <Text style={themedStyles.waitlistLabel}>{message}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </>
      }
    />
  );
}

/**
 * Convert a list of registered office hours into
 * renderable info.
 * 
 * @param {*} registered a list of registered office hours
 */
const getRenderList = (registered) => {
  /**
   * Determine the info needed for the 'blocks'.
   * It will return a list because oh is repeated. 
   * 
   * @param {object} oh an office hour
   */
  const getRenderInfo = (oh) => {
    const getDate = (myDate) => {
      const date = myDate.split(':');
      var month = parseInt(date[0])-1;
      var day = parseInt(date[1]);
      var year = parseInt(date[2]);

      return new Date(year, month, day);
    };

    const getTime = (myTime) => {
      const time = myTime.split(':');
      var hour = parseInt(time[0]);
      var minute = parseInt(time[1]);

      return [hour, minute];
    };

    const getWeekDay = () => {
      return oh.day;
    };

    const addDays = (date, addition) => {
      var result = new Date(date);
      result.setDate(result.getDate() + addition);
      return result;
    }

    const hasReachTerminal = (curr, terminal) => {
      return curr.getFullYear() > terminal.getFullYear() ||
              (curr.getFullYear() === terminal.getFullYear() &&
              curr.getMonth() > terminal.getMonth()) ||
              (curr.getFullYear() === terminal.getFullYear() &&
                curr.getMonth() === terminal.getMonth() &&
                curr.getDate() > terminal.getDate());
    }

    const getTitle = () => {
      const getCourse = () => {
        return oh.courseDepartment + " " + oh.courseNumber;
      };
  
      const getFacultyName = () => {
        return oh.facultyName;
      };

      return getCourse() + ", " + getFacultyName();
    };

    const initialDate = getDate(oh.initialDate);
    const terminalDate = getDate(oh.terminalDate);
    const startTime = getTime(oh.startTime);
    const endTime = getTime(oh.endTime);
    const weekDay = getWeekDay();
    const title = getTitle();
    
    const info = [];
    var currentDate;
    const convertToCorrectStartDate = (curr, weekDay) => {
      var currDay = curr.getDay();
      if (currDay > weekDay) {
        return addDays(curr, 7-(currDay-weekDay));
      } 
      else if (currDay < weekDay) {
        return addDays(curr, weekDay-currDay);
      }
      else {
        return curr;
      }
    }
    for (currentDate = convertToCorrectStartDate(initialDate, weekDay); 
        !hasReachTerminal(currentDate, terminalDate); 
        currentDate = addDays(currentDate, 7)) {
        info.push(
        {
          title: title,
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startTime[0], startTime[1]),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endTime[0], endTime[1]),
        }
      );
    }

    return info;
  };

  const result = [];
  for (var i = 0; i < registered.length; i++) {
    const renderInfo = getRenderInfo(registered[i]);
    result.push(renderInfo);
  }

  return result.flat();
};

const getHourStyle = () => {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return {
    fontFamily: currentTheme.mainFont,
    fontSize: currentTheme.fontSizes.small,
    color: currentTheme.mainColor,
  };
};

function CrossMark() {
  const themedStyles = ThemedStyles();

  return (
    <View>
      <View style={themedStyles.crossMarkPart1} />
      <View style={themedStyles.crossMarkpart2} />
    </View>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    topOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: currentTheme.mainColor,
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%',
      width: '80%',
      top: '25%',
      left: '10%',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // This is for Android
    },

    bottomOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: currentTheme.disableColor + 'CC',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      height: '120%',
      top: '-10%',
      width: '120%',
      left: '-10%',
    },

    waitlistButton: {
      borderRadius: 80,
      width: 160,
      height: 160,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // This is for Android
      backgroundColor: currentTheme.primaryColor,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    waitlistHintLabel: StyleSheet.flatten([
      { alignSelf: 'center', textAlign: 'center', padding: 20, height: 100 },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.primaryColor,
      ),
    ]),

    waitlistLabel: StyleSheet.flatten([
      { alignSelf: 'center', textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

    crossMarkPart1: {
      width: 36,
      height: 10,
      top: 15,
      right: 15,
      backgroundColor: currentTheme.primaryColor,
      transform: [{ rotate: '45deg' }],
    },

    crossMarkpart2: {
      width: 36,
      height: 10,
      top: 5,
      right: 15,
      backgroundColor: currentTheme.primaryColor,
      transform: [{ rotate: '135deg' }],
    },

    closeMenuBotton: {
      left: '35%',
      width: 36,
      height: 36,
      alignSelf: 'center',
    },
  });
}
