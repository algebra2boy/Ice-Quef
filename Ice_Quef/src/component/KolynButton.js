import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../style/AppTheme';
import * as KolynStyle from '../style/KolynStyleKit';
import { SpringButton } from '../style/SpringButton';

/**
 * Resembles an animated button
 *
 * @param { string } text: The button's text label
 * @param { func } onPress: Function to be exected after animation finishes
 * @return { ReactElement } The button
 */
export function KolynButton({ text, onPress }) {
  const themedStyles = ThemedStyles();

  return (
    <SpringButton
      text={text}
      onPress={onPress}
      buttonStyle={themedStyles.casualButton}
      labelStyle={themedStyles.casualButtonLabel}
    />
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    casualButton: StyleSheet.flatten([
      { height: 40, width: 200, backgroundColor: currentTheme.mainColor, alignSelf: 'center' },
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),

    casualButtonLabel: StyleSheet.flatten([
      { backgroundColor: currentTheme.mainColor },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.primaryColor,
      ),
    ]),
  });
}
