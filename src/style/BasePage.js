import { useCallback, useContext } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import loadFont from '../props/FontLoader';
import * as KolynStyle from './KolynStyleKit';
import loadImages from '../props/ImageLoader';
import { ThemeContext } from './AppTheme';

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

  const onLayoutRootView = useCallback(async () => {
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

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    screen: StyleSheet.flatten([KolynStyle.kolynScreen(currentTheme.bgColor)]),
  });
}
