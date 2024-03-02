import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, Keyboard } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import loadFont from '../props/FontLoader';
import * as KolynStyle from './KolynStyleKit';
import { ThemeContext } from './AppTheme';
import loadImages from '../props/ImageLoader';


const ios = Platform.OS == 'ios';

/**
 * The foundation of every page in the app.
 * Loads theme, fonts, images before rendering.
 * If on ios device, enables Safe Area View.
 * @param { ReactElement } components
 * @return { ReactElement } the base page
 */
export function BasePage({ components }) {
  const themedStyles = ThemedStyles();

  const fontsLoaded = loadFont();
  const imageLoaded = loadImages();

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded && imageLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, imageLoaded]);

  if (!fontsLoaded || !imageLoaded) {
    return null;
  }

  return (
    <View style={[themedStyles.screen, { height: '100%' }]} onLayout={onLayoutRootView}>
        <SafeAreaView className={ios ? '-mb-8' : ''} style={{ height: '100%' }}>
          {components}
        </SafeAreaView>
    </View>
  );
}

/**
 * Dismisses the keyboard if not on web platform
 */
function dismissKeyboard() {
  if (Platform.OS != 'web') {
    Keyboard.dismiss();
  }
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    screen: StyleSheet.flatten([KolynStyle.kolynScreen()]),
  });
}
