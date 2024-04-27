import { useState, createContext } from 'react';
import { resetNavigatorTabIndex } from './NavigatorTabIndexController';

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [logStatus, setLogin] = useState(0);

  const updateLogStatus = () => {
    setLogin(Date.now()); // timestamp for a unique value...idk if hash works too here
    resetNavigatorTabIndex();
  };

  return (
    <LoginContext.Provider value={{ logStatus, updateLogStatus }}>{children}</LoginContext.Provider>
  );
};
