import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { 
  SafeAreaView,   
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import loadFont from '../props/FontLoader';
import * as KolynStyle from '../kit/KolynStyleKit';
import { ThemeContext } from '../kit/AppTheme';
import loadImages from '../props/ImageLoader';


const ios = Platform.OS == 'ios';

export function BaseScreen({ components }) {
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
    <View 
      style={[themedStyles.screen, {height: '100%'}]}
      onLayout={onLayoutRootView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView 
          className={ios ? '-mb-8' : ''}
          style={{height: '100%'}}
        >
            { components }
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    screen: StyleSheet.flatten([KolynStyle.kolynScreen(currentTheme.backgroundColor)]),
  });
}
