import { Image, Dimensions } from 'react-native';
import Title from '../../assets/images/icon8.png';

/**
 * Resembles the app's logo
 *
 * @return {Image} The app's logo
 */
const width = Dimensions.get('window').width;
export function KolynLogo() {
  return (
    <Image
      source={Title}
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
    />
  );
}
