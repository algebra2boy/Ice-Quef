import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { SignupPageDefault } from '../../views/signup_page/Default';
import ServerAddress from '../../props/Server';
import encryptPassword from '../../props/encrypt';
import { UserContext } from '../../props/UserInfo';

/**
 * The controller for default sign up page. It controls:
 * 1. The validness of email,
 * 2. The validness of password,
 * 3. Attempts to register the user when everything is ok and sign up
 * button is pressed
 *
 * @returns { ReactElement } The default sign up page
 */
export function SignupPageDefaultController() {
  const navigation = useNavigation();

  // The email student entered
  const [email, setEmail] = useState('');
  // The password student entered
  const [password, setPassword] = useState('');
  // The password student entered again
  const [repassword, setRePassword] = useState('');
  // The email's current condition
  const [emailCondition, setEmailCondition] = useState(false);
  // The password's current condition
  const [passwordConditions, setPasswordConditions] = useState([false, false, false, false]);
  // The password's confirm condition
  const [confirmPasswordCondition, setConfirmPasswordCondition] = useState(true);

  const user = useContext(UserContext);

  // Checks if the entered email is valid
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

  // Invokes when the register button is pressed
  const onRegisterPressed = async () => {
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
    <SignupPageDefault
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      repassword={repassword}
      setRePassword={setRePassword}
      emailCondition={emailCondition}
      passwordConditions={passwordConditions}
      setPasswordConditions={setPasswordConditions}
      confirmPasswordCondition={confirmPasswordCondition}
      setConfirmPasswordCondition={setConfirmPasswordCondition}
      onRegisterPressed={onRegisterPressed}
      checkEmail={checkEmail}
    />
  );
}
