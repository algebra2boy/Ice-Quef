import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { KolynTopTitleLabel } from '../kits/KolynComponentKit';
import { ThemeContext} from '../kits/AppTheme';
import { loadImages } from '../props/ImageLoader';


const ios = Platform.OS == 'ios';

function CommonPart({components, title}) {
  const themedStyles = ThemedStyles();

  const MemoizedDivider = React.memo(function Divider() {
    return (<View style={themedStyles.divider} />);
  });

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
      <View style={themedStyles.screen}
          onLayout={onLayoutRootView}>
        <SafeAreaView 
          className={ios? '-mb-8': ''}
          style={{flex: 1}}>
          
          <KolynTopTitleLabel text={title}/>
  
          <MemoizedDivider/>
  
          <View style={{flex: 6}}>
  
            {components}
  
          </View>
  
          <MemoizedDivider/>
  
        </SafeAreaView>
      </View>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({
    screen: StyleSheet.flatten([
      KolynStyle.kolynScreen(currentTheme.mainColor),
    ]),
  
    divider: StyleSheet.flatten([
      {top: -20},
      KolynStyle.kolynDivider(currentTheme.primaryColor)
    ]),
  }));
}

export default CommonPart;
