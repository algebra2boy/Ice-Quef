import { Image, Dimensions } from 'react-native';
import Title from '../../assets/images/icon8.png';

const width = Dimensions.get('window').width;

/**
 * Resembles the app's logo
 *
 * @return {Image} The app's logo
 */
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
