import * as React from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [email, setEmail] = React.useState(null);

  return <UserContext.Provider value={{ email, setEmail }}>{children}</UserContext.Provider>;
};
