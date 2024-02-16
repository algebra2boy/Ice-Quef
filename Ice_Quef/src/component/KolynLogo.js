import { 
    Image, 
    Dimensions 
  } from 'react-native';
import Title from '../../assets/images/3D_Logo.png';


const { width } = Dimensions.get('window');
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
