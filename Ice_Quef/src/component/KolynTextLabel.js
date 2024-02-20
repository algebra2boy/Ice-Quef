import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as KolynStyle from './KolynStyleKit';
import ThemeContext from './AppTheme';

/**
 * Resembles a medium size title label
 *
 * @param { string } text: The title
 * @return { View }  A view that contains the text label
 */
export function KolynSubtitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.subtitle}>{title}</Text>;
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    subtitle: StyleSheet.flatten([
      { alignSelf: 'center', top: 20 },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.medium,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),
  });
}
