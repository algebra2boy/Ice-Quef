import { useState, useEffect, useContext } from 'react';
import { LoginPageDefault } from '../../views/login_page/Default';
import encryptPassword from '../../props/encrypt';
import ServerAddress from '../../props/Server';
import { LoginContext, loginStatus } from '../../props/LoginContext';

/**
 * Resembles the log in page
 * 
 * @returns { ReactElement } The log in page
 */
export function LoginPageDefaultController() {
  // The log in status
  const [status, setStatus] = useState(loginStatus.default);

  const pass = useContext(LoginContext);

  useEffect(() => {
    setStatus(loginStatus.default);
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
    <LoginPageDefault pressLogInButton={LogInButtonPressed} status={status} />
  );
}
