import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from './AppTheme';
import * as KolynStyle from './KolynStyleKit';

const width = Dimensions.get('window').width;

export const day = num => {
  switch (num) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
};

export function Bold({ text }) {
  const themedStyles = ManageOHStyles();

  return <Text style={themedStyles.itemLabelL}>{text}</Text>;
}

export function NonBold({ text }) {
  const themedStyles = ManageOHStyles();

  return <Text style={themedStyles.itemLabel}>{text}</Text>;
}

export function ManageOHStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    item: StyleSheet.flatten([
      {
        top: 0,
        width: width * 0.6,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: currentTheme.subColor,
        borderWidth: 4,
      },
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),

    itemLabel: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

    itemLabelL: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

    flatListView: {
      alignSelf: 'center',
    },
  });
}