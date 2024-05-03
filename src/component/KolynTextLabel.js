import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as KolynStyle from '../style/KolynStyleKit';
import { ThemeContext } from '../style/AppTheme';

/**
 * Resembles a normal size text label
 *
 * @param { string } text The title
 * @return { Text } The text label
 */
export function KolynTextLabel({ text, style }) {
  const themedStyles = ThemedStyles();

  return <Text style={StyleSheet.flatten([themedStyles.text, style])}>{text}</Text>;
}

/**
 * Resembles a big size title label
 *
 * @param { string } text The title
 * @return { Text } The text label
 */
export function KolynTitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.title}>{title}</Text>;
}

/**
 * Resembles a medium size title label
 *
 * @param { string } text The title
 * @return { Text } The text label
 */
export function KolynSubtitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.subtitle}>{title}</Text>;
}

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    text: StyleSheet.flatten([
      { marginVertical: 10 },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

    title: StyleSheet.flatten([
      { fontWeight: 'bold', margin: 10, alignSelf: 'center', textAlign: 'center' },
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
