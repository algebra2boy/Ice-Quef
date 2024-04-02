import React from 'react';
import { LoginPageDefault } from '../../views/login_page/Default';
import encryptPassword from '../../props/encrypt';
import ServerAddress from '../../props/Server';
import { Alert } from 'react-native';

async function LogInButtonPressed(email, password) {
  try {
    // Encrypt the password
    const hashedPassword = await encryptPassword(password);
    // Package data with the hashed password
    const loginData = {
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    try {
      // HTTP POST
      const response = await fetch(ServerAddress() + 'api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // get response
      const serverResponse = await response.json();
      // console.log(serverResponse);

      if (serverResponse.status === 'success' && response.ok) {
        // success
        Alert.alert('Success', 'You have been login successfully!');
        // TODO: navigate to calendar
        return true;
      } else if (serverResponse.status) {
        return false;
        // Alert.alert('Login Failed', serverResponse.message || 'Username or password is wrong');
      } else {
        // edge case
        return false;
        // Alert.alert('Login Failed', serverResponse.errors.toString() || 'An error occurred');
      }
    } catch (error) {
      // network error
      Alert.alert('Error', error.toString() || 'Could not connect to the server.');
      return false;
    }
  } catch (error) {
    // Handle errors as before
    Alert.alert('Error', error.toString());
    return false;
  }

  // Also expecting different errors
}

export function LoginPageDefaultController() {
  return <LoginPageDefault pressLogInButton={LogInButtonPressed} />;
}
