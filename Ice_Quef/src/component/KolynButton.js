import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../kit/AppTheme';
import * as KolynStyle from '../kit/KolynStyleKit';
import { SpringButton } from '../kit/SpringButton';


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
        currentTheme.primaryColor),
    ])
  });
}
