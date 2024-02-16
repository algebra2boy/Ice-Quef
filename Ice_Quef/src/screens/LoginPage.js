import React, { useState } from 'react';
import { View } from 'react-native';
import { 
  KolynButton, 
  KolynTextfield, 
  KolynLogo, 
} from '../component';
import { BaseScreen } from '../kit/BaseScreen';


export function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
  };

  const onSignUpPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <BaseScreen components={
      <>
        <View style={{ flex: 1 }}>
          <KolynLogo/>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <KolynTextfield
            value={username}
            setValue={setUsername}
            placeholder="Enter email"
            keyboardType="email-address"
            isSecure={ false }
          />
          <KolynTextfield
            value={password}
            setValue={setPassword}
            placeholder="Enter password"
            keyboardType="default"
            isSecure={ true }
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <KolynButton
            text="Log In"
            onPress={onSignInPressed}
          />
          <View style={{top: 20}}>
            <KolynButton
              text="Sign Up"
              onPress={onSignUpPress}
            />
          </View>
        </View>
      </>
    }/>
  );
}
