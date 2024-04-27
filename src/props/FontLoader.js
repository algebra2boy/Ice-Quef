import * as Font from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

/**
 * Loads fonts from bundles
 *
 * @return { boolean } Returns true if all fonts were successfully loaded,
 * returns false otherwise.
 */
function loadFont() {
  const [fontsLoaded] = Font.useFonts({
    'Quenda-Medium': require('../../assets/fonts/Quenda-Medium.otf'),
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
