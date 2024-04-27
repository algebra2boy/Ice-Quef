import { useState, createContext } from 'react';
import { resetNavigatorTabIndex } from './NavigatorTabIndexController';

export const LoginContext = createContext(null);

/**
 * @enum {(string)=>string | string} The status of log in
 */
export const loginStatus = {
  default: '',
  success: 'You have been logged in successfully!',
  notMatch: serverMsg => serverMsg || 'Log in failed. Your email or password was not found.',
  serverFail: serverMsg => serverMsg || 'Could not connect to the server, please try again later.',
  edgeCase: serverMsg => serverMsg || 'An error has occurred, please try again later.',
  unknown: serverMsg => serverMsg || 'An unknown error has occurred.',
};

export const LoginProvider = ({ children }) => {
  const [currentLoginStatus, setCurrentLoginStatus] = useState(0);

  const updateLoginStatus = () => {
    setCurrentLoginStatus(Date.now()); // timestamp for a unique value...idk if hash works too here
    resetNavigatorTabIndex();
  };

  return (
    <LoginContext.Provider value={{ currentLoginStatus, updateLoginStatus }}>{children}</LoginContext.Provider>
  );
};
