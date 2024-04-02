import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { renderEvent, eventCellTheme } from '../../style/CaleStyle';
import * as KolynStyle from '../../style/KolynStyleKit';

export function CalendarPageDefault(props) {
  const hourStyle = getHourStyle();

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [title, setTitle] = useState('');

  const onPressEvent = event => {
    setOpenMenu(true);
    setTitle(event.title);
  };

  return (
    <BasePage
      components={
        <>
          <View style={{ flex: 20 }}>
            <Calendar
              events={props.regLst}
              height={400}
              mode="3days"
              theme={eventCellTheme()}
              renderEvent={renderEvent}
              hourStyle={hourStyle}
              showWeekNumber={true}
              onPressEvent={onPressEvent}
            />
            {isOpenMenu && (
              <PopupMenu
                title={title}
                determineMessage={props.determineMessage}
                message={props.message}
                setOpenMenu={setOpenMenu}
              />
            )}
          </View>
        </>
      }
    />
  );
}

const getHourStyle = () => {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return {
    fontFamily: currentTheme.mainFont,
    fontSize: currentTheme.fontSizes.small,
    color: currentTheme.mainColor,
  };
};

function PopupMenu(props) {
  const themedStyles = ThemedStyles();

  return (
    <View style={themedStyles.bottomOverlay}>
      <View style={themedStyles.topOverlay}>
        <View style={{ bottom: '10%' }}>
          <TouchableOpacity
            style={themedStyles.closeMenuBotton}
            onPress={() => props.setOpenMenu(false)}
          >
            <CrossMark />
          </TouchableOpacity>

          <Text style={[themedStyles.waitlistHintLabel]}>{props.title}</Text>

          <TouchableOpacity
            style={themedStyles.waitlistButton}
            onPress={() => props.determineMessage()}
          >
            <Text style={themedStyles.waitlistLabel}>{props.message}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
