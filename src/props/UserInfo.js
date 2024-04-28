import { useState, createContext } from 'react';

export const UserContext = createContext(null);

/**
 * Invokes when user credientials are upated,
 * other classes can also access them through this hook.
 *
 * @param {ReactElement} children
 * @returns Void
 */
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider value={{ email, setEmail, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
