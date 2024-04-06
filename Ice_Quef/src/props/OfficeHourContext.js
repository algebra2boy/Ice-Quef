import React, { createContext, useContext, useState } from 'react';

const OfficeHourUpdateContext = createContext();

export const useOfficeHourUpdate = () => useContext(OfficeHourUpdateContext);

export const OfficeHourUpdateWrapper = ({ children }) => {
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const triggerUpdate = () => {
        setUpdateTrigger(Date.now()); // timestamp for a unique value...idk if hash works too here
    };

    return (
        <OfficeHourUpdateContext.Provider value={{ triggerUpdate, updateTrigger }}>
            {children}
        </OfficeHourUpdateContext.Provider>
    );
};
