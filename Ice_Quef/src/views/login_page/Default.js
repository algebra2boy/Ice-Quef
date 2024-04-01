import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Dimensions } from 'react-native';
import { KolynButton, KolynTextfield, KolynLogo } from '../../component';
import { BasePage } from '../../style/BasePage';
import { UserContext } from '../../props/UserInfo';

const height = Dimensions.get('window').height;

/**
 * Resembles the login page
 *
 * @param { Props } { navigation }
 * @return { ReactElement } The login page
 */
export function LoginPageDefault({ pressLogInButton }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userManager = React.useContext(UserContext);

  const onLogInPressed = async () => {
    const isPass = await pressLogInButton(email, password);
    userManager.setUser(email.toLowerCase());

    if (isPass) {
      // validate user
      navigation.navigate('Calendar');
      // activate bottom tab navigator
      navigation.navigate('BottomTab');
    } else {
      // didn't login successfully
      // console.log("didn't login successfully")
    }
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
