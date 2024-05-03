import { useContext, useEffect, useReducer } from 'react';
import { Image, Dimensions } from 'react-native';
import iceQuebUmass from '../../assets/images/icon7.png';
import iceQueb from '../../assets/images/icon8.png';
import { ThemeContext } from '../style/AppTheme';

const width = Dimensions.get('window').width;

/**
 * Resembles the app's logo
 *
 * @return {Image} The app's logo
 */
export function KolynLogo() {
  const themeManager = useContext(ThemeContext);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    forceUpdate();
  }, [themeManager.theme])

  return (
    <Image
      source={themeManager.shouldUseUmassIcon() ? iceQuebUmass : iceQueb}
      style={[
        {
          width: '75%',
          maxWidth: 256,
          height: width * 0.75,
          maxHeight: 256,
          alignSelf: 'center',
        },
      ]}
      resizeMode="contain"
      testID="logo"
    />
  );
}
