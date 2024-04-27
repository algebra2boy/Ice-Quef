import { useState, createContext } from 'react';
import { resetNavigatorTabIndex } from './NavigatorTabIndexController';

export const LoginContext = createContext(null);

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
