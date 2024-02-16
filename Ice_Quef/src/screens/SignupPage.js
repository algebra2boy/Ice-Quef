import React, {useState} from 'react';
import {
View, 
Text, 
StyleSheet, 
ScrollView,
} from 'react-native';
import { ThemeContext } from '../kit/AppTheme';
import { BaseScreen } from '../kit/BaseScreen';
import { 
  KolynButton, 
  KolynTextfield, 
} from '../component';


export function SignupPage({ navigation }) {
  const themedStyles = ThemedStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [hasValidPassword, setValidPassword] = useState(true);

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };
  return (
    <BaseScreen components={
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column', 
            flexGrow: 1, 
            justifyContent: 'space-between'}}
        >
          <View style={themedStyles.root}>
            <Text 
              style={themedStyles.title}
            >
              Create an account
            </Text>

            <View style={{top: 20, height: '65%'}}>
              <Text 
                style={[themedStyles.text, {alignSelf: 'flex-start'}]}
              >
                User Name
              </Text>
              <KolynTextfield
                value={username}
                setValue={setUsername}
                placeholder=""
                keyboardType="default"
                isSecure={ false }
              />

              <Text 
                style={[themedStyles.text, {alignSelf: 'flex-start'}]}
              >
                Email
              </Text>
              <KolynTextfield
                value={email}
                setValue={setEmail}
                placeholder=""
                keyboardType="email-address"
                isSecure={ false }
              />

              <Text 
                style={[themedStyles.text, {alignSelf: 'flex-start'}]}
              >
                Password
              </Text>
              <KolynTextfield
                value={password}
                setValue={setPassword}
                placeholder=""
                keyboardType="default"
                isSecure={ true }
              />
              {
                hasValidPassword &&
                <>
                  <Text 
                    style={[themedStyles.text, {alignSelf: 'flex-start'}]}
                  >
                    Re-enter Password
                  </Text>
                  <KolynTextfield
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    placeholder=""
                    keyboardType="default"
                    isSecure={ true }
                  />
                </>
              }

            </View>
            <View style={{ top: 50 }}>
              <KolynButton
                text="Register"
                onPress={()=>{}}
              />
              <View style={{top: 20}}>
                <KolynButton
                  text="Go Back"
                  onPress={()=>{navigation.goBack()}}
                />
              </View>
            </View>

            <View style={{ top: 100 }}>
              <WarningLabel
                themedStyles={themedStyles}
                onTermsOfUsePressed={onTermsOfUsePressed}
                onPrivacyPressed={onPrivacyPressed}
              />
            </View>
          </View>
        </ScrollView>
    }/>
  );
}

function WarningLabel({ 
                        themedStyles, 
                        onTermsOfUsePressed, 
                        onPrivacyPressed}) {
  return (
    <View>
      <Text 
        style={themedStyles.text}
      >
        By registering, you confirm that you accept our{' '}
        <Text 
          style={themedStyles.link} 
          onPress={onTermsOfUsePressed}
        >
          Terms of Use
        </Text>{' '}
          and{' '}
        <Text 
          style={themedStyles.link} 
          onPress={onPrivacyPressed}
        >
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },

    title: {
      fontSize: currentTheme.fontSizes.large,
      fontWeight: 'bold',
      color: currentTheme.subColor,
      margin: 20,
      fontFamily: currentTheme.mainFont
    },

    text: {
      color: currentTheme.subColor,
      marginVertical: 10,
      fontFamily: currentTheme.mainFont
    },
    
    link: {
      color: currentTheme.mainColor,
      fontFamily: currentTheme.mainFont
    },
  });
}
