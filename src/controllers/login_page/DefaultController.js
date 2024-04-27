import { useState, useEffect, useContext } from 'react';
import { LoginPageDefault } from '../../views/login_page/Default';
import encryptPassword from '../../props/encrypt';
import ServerAddress from '../../props/Server';
import { LoginContext } from '../../props/LoginContext';

/**
 * @enum {(string)=>string | string} The status of log in
 */
const loginStatus = {
  default: '',
  success: 'You have been logged in successfully!',
  notMatch: serverMsg => serverMsg || 'Log in failed. Your email or password was not found.',
  serverFail: serverMsg => serverMsg || 'Could not connect to the server, please try again later.',
  edgeCase: serverMsg => serverMsg || 'An error has occurred, please try again later.',
  unknown: serverMsg => serverMsg || 'An unknown error has occurred.',
};

/**
 * Resembles the log in page
 * 
 * @returns { ReactElement } The log in page
 */
export function LoginPageDefaultController() {
  // The log in status
  const [status, setStatus] = useState(loginStatus.default);
  // The success status
  const [isSuccess, setSuccess] = useState(false);

  const pass = useContext(LoginContext);

  useEffect(() => {
    setStatus(loginStatus.default);
    setSuccess(false);
  }, [pass.currentLoginStatus]);

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

        if (serverResponse.status === 'success' && response.ok) {
          // success
          setStatus(loginStatus.success);
          setSuccess(true);
          return serverResponse.token;
        } else if (serverResponse.status) {
          setStatus(loginStatus.notMatch);
          return null;
        } else {
          // edge case
          setStatus(loginStatus.edgeCase);
          return null;
        }
      } catch (error) {
        setStatus(loginStatus.serverFail);
        return null;
      }
    } catch (error) {
      // Handle errors as before
      setStatus(loginStatus.unknown);
      return null;
    }
  }

  return (
    <LoginPageDefault pressLogInButton={LogInButtonPressed} status={status} isSuccess={isSuccess} />
  );
}
