import * as Font from "expo-font";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';


function loadFont() {
  const [fontsLoaded] = Font.useFonts({
    'BalooBhai-Regular': require('../../assets/fonts/BalooBhai-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return fontsLoaded;
}

export default loadFont;