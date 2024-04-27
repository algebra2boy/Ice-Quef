import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { KolynButton, KolynTextfield, KolynLogo, KolynTextLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { UserContext } from '../../props/UserInfo';
import { ThemeContext } from '../../style/AppTheme';

const height = Dimensions.get('window').height;

/**
 * Resembles the login page
 *
 * @param { Props } { navigation }
 * @return { ReactElement } The login page
 */
export function LoginPageDefault(props) {
  const themedStyles = ThemedStyles();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useContext(UserContext);

  const pressLogInButton = props.pressLogInButton;
  const status = props.status;
  const isSuccess = props.isSuccess;

  const onLogInPressed = async () => {
    const userToken = await pressLogInButton(email, password);
    user.setEmail(email.toLowerCase());

    if (userToken != null) {
      // validate user
      user.setToken(userToken);
      navigation.navigate('Calendar');
      navigation.navigate('BottomTab');
    } else {

    } // log in failed
  };

  const onSignUpPress = () => {
    navigation.navigate('Signup');
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
          <View style={{ alignItems: 'center', padding: 20 }}>
            <View style={{ height: height * 0.5 }}>
              <View>
                <KolynLogo />
              </View>

              <View>
                <KolynTextfield
                  value={email}
                  setValue={setEmail}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  isSecure={false}
                />
                <KolynTextfield
                  value={password}
                  setValue={setPassword}
                  placeholder="Enter password"
                  keyboardType="default"
                  isSecure={true}
                />
                <KolynTextLabel
                  text={status}
                  style={isSuccess ? themedStyles.hintSuccess : themedStyles.hintFail}
                />
              </View>
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton text="Log In" onPress={onLogInPressed} testID={'loginButton'} />
              <View style={{ top: 20 }}>
                <KolynButton text="Sign Up" onPress={onSignUpPress} />
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    hintSuccess: {
      fontSize: currentTheme.fontSizes.small,
      color: currentTheme.mainColor,
      marginVertical: 0,
      textAlign: 'center',
    },
    hintFail: {
      fontSize: currentTheme.fontSizes.small,
      color: currentTheme.errorColor,
      marginVertical: 0,
      textAlign: 'center',
    },
  });
}
