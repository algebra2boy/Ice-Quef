import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemeContext } from '../style/AppTheme';
import { BasePage } from '../style/BasePage';
import { KolynButton, KolynTextfield } from '../component';


const passwordHint = {
  0 : "At least one lowercase letter",
  1 : "At least one uppercase letter",
  2 : "At least one number",
  3 : "Minimum 8 characters",
}

const height = Dimensions.get('window').height;
export function SignupPage({ navigation }) {
  const themedStyles = ThemedStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [passwordConditions, setPasswordConditions] = useState([false, false, false, false]);

  const onRegisterPressed = () => {
    navigation.navigate('');
  };

  const checkPassword = (password) => {
    const containsLetter = /[a-zA-Z]/;
    const containsNumber = /[0-9]/;
    const atLeastOneLowercase = () => {
      return password !== password.toUpperCase() &&
            containsLetter.test(password);
    };
    const atLeastOneUppercase = () => {
      return password !== password.toLowerCase() &&
            containsLetter.test(password);
    };
    const atLeastOneNumber = () => {
      return containsNumber.test(password);
    };
    const minimumEightChars = () => {
      return password.length >= 8;
    };

    setPasswordConditions([
      atLeastOneLowercase(), 
      atLeastOneUppercase(), 
      atLeastOneNumber(), 
      minimumEightChars()]);
  };

  return (
    <BasePage
      components={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <Text style={[themedStyles.title, { alignSelf: 'center' }]}>Create an account</Text>

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>Email</Text>
              <KolynTextfield
                value={email}
                setValue={setEmail}
                placeholder=""
                keyboardType="email-address"
                isSecure={false}
              />

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>Password</Text>
              <KolynTextfield
                value={password}
                setValue={(password) => {
                  setPassword();
                  checkPassword(password);
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />

              <PasswordHintText 
                themedStyles={themedStyles}
                passwordHint={passwordHint}
                passwordConditions={passwordConditions}
              />

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>Confirm Password</Text>
              <KolynTextfield
                value={repassword}
                setValue={setRePassword}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />

            </View>
            <View style={{ top: height * 0.1 }}>
              <KolynButton text="Register" onPress={() => {}} />
              <View style={{ top: 20 }}>
                <KolynButton
                  text="Go Back"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            </View>

          </View>
        </ScrollView>
      }
    />
  );
}

function PasswordHintText({ themedStyles, passwordHint, passwordConditions }) {
  return (
    <View>
      <Text style={passwordConditions[0] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        { passwordHint[0] }
      </Text>
      <Text style={passwordConditions[1] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        { passwordHint[1] }
      </Text>
      <Text style={passwordConditions[2] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        { passwordHint[2] }
      </Text>
      <Text style={passwordConditions[3] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        { passwordHint[3] }
      </Text>
    </View>
  );
}

function WarningLabel({ themedStyles, onTermsOfUsePressed, onPrivacyPressed }) {
  return (
    <View>
      <Text style={themedStyles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={themedStyles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={themedStyles.link} onPress={onPrivacyPressed}>
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
      fontFamily: currentTheme.mainFont,
    },

    text: {
      color: currentTheme.subColor,
      marginVertical: 10,
      fontFamily: currentTheme.mainFont,
    },

    hintTextError: {
      color: currentTheme.errorColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny
    },

    hintTextPass: {
      color: currentTheme.mainColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny
    }

  });
}
