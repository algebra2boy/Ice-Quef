import * as React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import * as KolynStyle from './KolynStyleKit';
import ThemeContext from './AppTheme';
import { SpringButton } from './SpringButton';
import Title from '../../assets/images/3D_Logo.png';


const { width } = Dimensions.get('window');

/* The icon & title image */
export function KolynMainTitleImage() {
  const { width, height } = Dimensions.get('window');

  return (
    <Image
      source={Title}
      style={[
        {
          width: '75%',
          maxWidth: 256,
          height: width * 0.75,
          maxHeight: 256,
        },
      ]}
      resizeMode="contain"
    />
  );
}

export function KolynTopTitleLabel({ text }) {
  const themedStyles = ThemedStyles();

  return (
    <View style={themedStyles.topTitle}>
      <Text style={themedStyles.topTitleLabel}>{text}</Text>
    </View>
  );
}

export function KolynSubtitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.subtitle}>{title}</Text>;
}

export function KolynCasualButton({ onPress, text }) {
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
    mainTitle: {
      resizeMode: 'contain',
      width: 400,
      height: width * 0.2,
      alignSelf: 'center',
    },

    topTitle: { color: currentTheme.mainColor },

    topTitleLabel: StyleSheet.flatten([
      { alignSelf: 'center', height: 50, top: -10, backgroundColor: currentTheme.mainColor },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.primaryColor,
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

    casualButton: StyleSheet.flatten([
      { width: 240, backgroundColor: currentTheme.mainColor, alignSelf: 'center' },
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
