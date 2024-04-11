import React, { createContext, useContext, useState } from 'react';

const OfficeHourUpdateContext = createContext();

export const useOfficeHourUpdate = () => useContext(OfficeHourUpdateContext);

export const OfficeHourUpdateWrapper = ({ children }) => {
  // used in office hour manage page, used to refresh office hour search list
  // when new character is inserted into the search bar
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // used between office hour manage page and calendar page, used to refresh 
  // the office hour 'blocks' in the calendar when an office hour is added / removed
  // from the manage page
  const [shouldRefreshCalendar, setShouldRefreshCalendar] = useState(false);

  /*
    set to true when the office hour in calendar page need to be udpated
    trigger calendar page render when an office is deleted / added
  */

  const triggerUpdate = () => {
    setUpdateTrigger(Date.now()); // timestamp for a unique value...idk if hash works too here
  };

  return (
    <OfficeHourUpdateContext.Provider 
      value={{ 
        triggerUpdate, 
        updateTrigger, 
        shouldRefreshCalendar, 
        setShouldRefreshCalendar 
      }}>

      {children}

    </OfficeHourUpdateContext.Provider>
  );
};
