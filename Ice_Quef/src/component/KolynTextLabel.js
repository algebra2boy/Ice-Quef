import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as KolynStyle from '../style/KolynStyleKit';
import { ThemeContext } from '../style/AppTheme';


export function KolynTextLabel({ text, style }) {
  const themedStyles = ThemedStyles();

  return (
    <Text 
      style={StyleSheet.flatten([themedStyles.text, style])}
    >
      {text}
    </Text>
  );
}

export function KolynTitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.title}>{title}</Text>;
}

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

    text: StyleSheet.flatten([
      { marginVertical: 10 },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      )
    ]),

    title: StyleSheet.flatten([
      { fontWeight: 'bold', margin: 20, alignSelf: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.large,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

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
