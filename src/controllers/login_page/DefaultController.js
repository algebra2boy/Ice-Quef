import { useState, useEffect, useContext } from 'react';
import { LoginPageDefault } from '../../views/login_page/Default';
import encryptPassword from '../../props/encrypt';
import ServerAddress from '../../props/Server';
import { LoginContext, loginStatus } from '../../props/LoginContext';

/**
 * The controller for the log in page.
 * It controls the user's log in status and
 * the log in button.
 *
 * @returns { ReactElement } The log in page
 */
export function LoginPageDefaultController() {
  // The log in status
  const [status, setStatus] = useState(loginStatus.default);

  const loginContext = useContext(LoginContext);

  // If the user is on this page, they must be either
  // just opened the app or logged out. Set the login
  // status to default, which is "not logged in yet".
  useEffect(() => {
    setStatus(loginStatus.default);
  }, [loginContext.currentLoginStatus]);

  // Function to handle the log in button press
  async function LogInButtonPressed(email, password) {
    try {
      // Encrypt the password
      const hashedPassword = await encryptPassword(password);
      // Package data with the hashed password
      const loginData = {
        email: email.toLowerCase(),
        password: hashedPassword,
        isTeacher: false
      };

      try {
        // HTTP POST
        const response = await fetch(ServerAddress() + 'api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });

        // get response
        const serverResponse = await response.json();

        if (serverResponse.status === 'success' && response.ok) {
          // success
          setStatus(loginStatus.success);
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

  return <LoginPageDefault pressLogInButton={LogInButtonPressed} status={status} />;
}
