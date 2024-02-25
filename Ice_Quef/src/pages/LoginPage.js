import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { KolynButton, KolynTextfield, KolynLogo } from '../component';
import { BasePage } from '../kit/BasePage';


const height = Dimensions.get('window').height;

/**
 * Resembles the login page
 *
 * @param { Props } { navigation }
 * @return { ReactElement } The login page
 */
export function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
    navigation.navigate('BottomTab')
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
                  value={username}
                  setValue={setUsername}
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
              <KolynButton text="Log In" onPress={onSignInPressed} />
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
