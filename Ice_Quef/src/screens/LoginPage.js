import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  Image, 
  View, 
  Dimensions 
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import loadFont from '../props/FontLoader';
import Logo from '../../assets/images/Logo.png';
import Title from '../../assets/images/Title.png'
import CustomTextInput from '../component/customInput/CutomTextInput';
import CustomButton from '../component/customButton/CustomButton';
import SocialSignInButtons from '../component/socialSignInButton/SocialSignInButton';


function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {width, height} = Dimensions.get('window');

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const fontsLoaded = loadFont();
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <SafeAreaView style={styles.root}>
        <Image 
          source={Title}
          style={[{
            width: '75%',
            maxWidth: 256,
            height: width * 0.75,
            maxHeight: 256
          }]}
          resizeMode="contain"
        />

        <CustomTextInput 
          placeholder="User name"
          value={username}
          setValue={setUsername}
        />
        <CustomTextInput 
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton 
          text="Sign In" 
          onPress={onSignInPressed}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    alignItems: 'center',
    padding: 20,
  },

});

export default LoginPage;
