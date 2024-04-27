import { createContext, useContext, useState } from 'react';

const OfficeHourUpdateContext = createContext();

export const useOfficeHourUpdate = () => useContext(OfficeHourUpdateContext);

/**
 * Triggers when the student's registered office hour list is modified
 * 
 * @param { ReactElement } children 
 * @returns Void
 */
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
