import { useState, createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider value={{ email, setEmail, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
