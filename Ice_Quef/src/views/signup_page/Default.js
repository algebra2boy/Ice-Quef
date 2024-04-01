import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { ThemeContext } from '../../style/AppTheme';
import { BasePage } from '../../style/BasePage';
import { KolynButton, KolynTextfield, KolynTitleLabel, KolynTextLabel } from '../../component';
import ServerAddress from '../../props/Server';
import encryptPassword from '../../props/encrypt';
import { UserContext } from '../../props/UserInfo';

const emailHint = {
  0: 'Enter your UMass email',
};
const passwordHint = {
  0: 'At least one lowercase letter',
  1: 'At least one uppercase letter',
  2: 'At least one number',
  3: 'Minimum 8 characters',
};
const confirmPasswordHint = {
  0: 'Enter your password again',
};

const height = Dimensions.get('window').height;

export function SignupPageDefault({}) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [emailCondition, setEmailCondition] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState([false, false, false, false]);
  const [confirmPasswordCondition, setConfirmPasswordCondition] = useState(true);

  const checkEmail = email => {
    if (email === undefined) return;

    const isEnoughLength = () => {
      return email.length >= 13;
    };

    const isUMass = () => {
      return email.endsWith('@umass.edu');
    };

    setEmailCondition(isEnoughLength() && isUMass());
  };

  const checkPassword = password => {
    if (password === undefined) return;
    const containsLetter = /[a-zA-Z]/;
    const containsNumber = /[0-9]/;

    const atLeastOneLowercase = () => {
      return password !== password.toUpperCase() && containsLetter.test(password);
    };
    const atLeastOneUppercase = () => {
      return password !== password.toLowerCase() && containsLetter.test(password);
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
      minimumEightChars(),
    ]);
  };

  const checkConfirmPassword = (val, isEnterFromRePassword) => {
    const isTheSame = () => {
      if (isEnterFromRePassword) {
        return val === password;
      } else {
        return val === repassword;
      }
    };

    setConfirmPasswordCondition(isTheSame());
  };

  const onRegisterPressed = async () => {
    // console.log("email: " + emailCondition);
    // console.log("password: " + passwordConditions);
    // console.log("repassword: " + confirmPasswordCondition);
    const userManager = React.useContext(UserContext);

    // validate email address
    if (!emailCondition) {
      Alert.alert('Error', 'Please enter valid email associate with UMass domain');
      return;
    }

    // password match
    if (!confirmPasswordCondition) {
      Alert.alert('Error', "Passwords doesn't match!");
      return;
    }

    // password validation
    if (passwordConditions.includes(false)) {
      Alert.alert('Error', "At least one of the password requirements don't meet");
      return;
    }

    // package data
    try {
      // Encrypt the password
      const hashedPassword = await encryptPassword(password);
      // Package data with the hashed password
      const registrationData = {
        email: email.toLowerCase(),
        password: hashedPassword,
      };

      try {
        // HTTP POST
        const response = await fetch(ServerAddress() + 'api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        // get response
        const serverResponse = await response.json();

        if (response.ok) {
          // success
          userManager.setUser(email.toLowerCase());
          Alert.alert('Success', 'You have been registered successfully!');

          navigation.navigate('Calendar');
          navigation.navigate('BottomTab');
          //TODO: idk which page will be navigated to after a successful registration.
        } else {
          // edge case
          Alert.alert(
            'Registration Failed',
            serverResponse.errors.toString() || 'An error occurred',
          );
        }
      } catch (error) {
        // network error
        Alert.alert('Error', 'Could not connect to the server.');
      }
    } catch (error) {
      // Handle errors as before
      Alert.alert('Error', error.toString());
    }
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
              <KolynTitleLabel title="Create an account" />
              <KolynTextLabel text="Email" />
              <KolynTextfield
                value={email}
                setValue={email => {
                  setEmail(email);
                  checkEmail(email);
                }}
                placeholder=""
                keyboardType="email-address"
                isSecure={false}
              />
              <EmailHintText
                themedStyles={themedStyles}
                emailHint={emailHint}
                emailCondition={emailCondition}
              />

              <KolynTextLabel text="Password" />
              <KolynTextfield
                value={password}
                setValue={password => {
                  setPassword(password);
                  checkPassword(password);
                  checkConfirmPassword(password, false);
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

              <KolynTextLabel text="Confirm Password" />
              <KolynTextfield
                value={repassword}
                setValue={repassword => {
                  setRePassword(repassword);
                  checkConfirmPassword(repassword, true);
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />
              <ConfirmPasswordHintText
                themedStyles={themedStyles}
                confirmPasswordHint={confirmPasswordHint}
                confirmPasswordCondition={confirmPasswordCondition}
              />
            </View>
            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Register"
                onPress={() => {
                  onRegisterPressed();
                }}
              />
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

function EmailHintText({ themedStyles, emailHint, emailCondition }) {
  return (
    <View>
      <Text style={emailCondition ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {emailHint[0]}
      </Text>
    </View>
  );
}

function PasswordHintText({ themedStyles, passwordHint, passwordConditions }) {
  return (
    <View>
      <Text style={passwordConditions[0] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[0]}
      </Text>
      <Text style={passwordConditions[1] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[1]}
      </Text>
      <Text style={passwordConditions[2] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[2]}
      </Text>
      <Text style={passwordConditions[3] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[3]}
      </Text>
    </View>
  );
}

function ConfirmPasswordHintText({ themedStyles, confirmPasswordHint, confirmPasswordCondition }) {
  return (
    <View>
      <Text
        style={confirmPasswordCondition ? themedStyles.hintTextPass : themedStyles.hintTextError}
      >
        {confirmPasswordHint[0]}
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

    hintTextError: {
      color: currentTheme.errorColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny,
    },

    hintTextPass: {
      color: currentTheme.mainColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny,
    },
  });
}
