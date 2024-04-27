import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { ThemeContext } from '../../style/AppTheme';
import { BasePage } from '../../style/BasePage';
import { KolynButton, KolynTextfield, KolynTitleLabel, KolynTextLabel } from '../../component';
import ServerAddress from '../../props/Server';
import encryptPassword from '../../props/encrypt';
import { UserContext } from '../../props/UserInfo';
import { passwordHint, confirmPasswordHint } from '../../props/PasswordEnum';
import { PasswordHintText, ConfirmPasswordHintText } from '../../component/PasswordHintText';
import { checkPassword, checkConfirmPassword } from '../../props/PasswordSetter';

const emailHint = {
  0: 'Enter your UMass email',
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

  const user = useContext(UserContext);

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

  const onRegisterPressed = async () => {
    // console.log("email: " + emailCondition);
    // console.log("password: " + passwordConditions);
    // console.log("repassword: " + confirmPasswordCondition);

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
          const userToken = serverResponse.token;

          user.setEmail(email.toLowerCase());
          user.setToken(userToken);
          Alert.alert('Success', 'You have been registered successfully!');

          navigation.navigate('Calendar');
          navigation.navigate('BottomTab');
          //TODO: idk which page will be navigated to after a successful registration.
        } else {
          // edge case
          Alert.alert('Registration Failed', serverResponse.message || 'An error occurred');
        }
      } catch (error) {
        // network error
        console.error(error);
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
                  checkPassword(password, setPasswordConditions);
                  checkConfirmPassword(
                    password,
                    password,
                    repassword,
                    false,
                    setConfirmPasswordCondition,
                  );
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />
              <PasswordHintText
                passwordHint={passwordHint}
                passwordConditions={passwordConditions}
              />

              <KolynTextLabel text="Confirm Password" />
              <KolynTextfield
                value={repassword}
                setValue={repassword => {
                  setRePassword(repassword);
                  checkConfirmPassword(
                    repassword,
                    password,
                    repassword,
                    true,
                    setConfirmPasswordCondition,
                  );
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />
              <ConfirmPasswordHintText
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

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
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
