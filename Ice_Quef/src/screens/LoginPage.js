import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Image, View, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import loadFont from '../props/FontLoader';
import Title from '../../assets/images/3D_Logo.png';
import { SpringButton } from '../kit/SpringButton';
import * as KolynStyle from '../kit/KolynStyleKit';
import { ThemeContext } from '../kit/AppTheme';

const { width } = Dimensions.get('window');

export function LoginPage({ navigation }) {
  const themedStyles = ThemedStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
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
    <View onLayout={onLayoutRootView} style={themedStyles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
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
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <EmailTextfield
            emailText={username}
            onChangeEmailText={setUsername}
            textfieldStyle={themedStyles.inputTextfield}
          />

          <PasswordTextfild
            passwordText={password}
            onChangePasswordText={setPassword}
            textfieldStyle={themedStyles.inputTextfield}
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <SpringButton
            text="Log In"
            onPress={onSignInPressed}
            buttonStyle={themedStyles.casualButton}
            labelStyle={themedStyles.casualButtonLabel}
          />
          <SpringButton
            text="Sign Up"
            onPress={onSignUpPress}
            buttonStyle={[themedStyles.casualButton, { top: 30 }]}
            labelStyle={themedStyles.casualButtonLabel}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

/* The email textfield */
function EmailTextfield({ emailText, onChangeEmailText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={emailText}
      onChangeText={onChangeEmailText}
      placeholder="Enter email"
      keyboardType="email-address"
      secureTextEntry={false}
    />
  );
}

/* The password textfield, secure typing */
function PasswordTextfild({ onChangePasswordText, passwordText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={passwordText}
      onChangeText={onChangePasswordText}
      placeholder="Enter password"
      keyboardType="default"
      secureTextEntry={true}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
});

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    screen: StyleSheet.flatten([KolynStyle.kolynScreen(currentTheme.backgroundColor)]),

    inputTextfield: StyleSheet.flatten([
      { height: 40, width: 300 },
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),

    casualButton: StyleSheet.flatten([
      { height: 40, width: 200, backgroundColor: currentTheme.mainColor, alignSelf: 'center' },
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),

    casualButtonLabel: StyleSheet.flatten([
      { backgroundColor: currentTheme.mainColor },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.primaryColor,
      ),
    ]),
  });
}
