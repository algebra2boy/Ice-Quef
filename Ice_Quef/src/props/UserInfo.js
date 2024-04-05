import * as React from 'react';
import {createContext} from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [email, setEmail] = React.useState(null);
    const [token, setToken] = React.useState(null);
    return <UserContext.Provider value={{email, setEmail, token, setToken}}>{children}</UserContext.Provider>;
};
