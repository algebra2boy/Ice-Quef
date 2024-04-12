import React, { createContext, useContext, useState, useEffect } from 'react';
import { GetUserOfficeHour } from '../models/RegisterModel';
import { UserContext } from './UserInfo';

const OfficeHourUpdateContext = createContext();

export const useOfficeHourUpdate = () => useContext(OfficeHourUpdateContext);

export const OfficeHourUpdateWrapper = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const triggerUpdate = () => {
    setUpdateTrigger(Date.now()); // timestamp for a unique value...idk if hash works too here
    console.log(updateTrigger);
  };

  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator

  const user = React.useContext(UserContext);
  const userEmail = user.email; // get user email address (account name)

  useEffect(() => {
    const fetchUserOfficeHour = async () => {
      try {
        setIsLoading(true); // Before the fetch starts
        const officeHours = await GetUserOfficeHour(userEmail);
        setOfficeHour(officeHours);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // fetch is complete or if there is an error
      }
    };

    fetchUserOfficeHour();
  }, [updateTrigger]);

  return (
    <OfficeHourUpdateContext.Provider value={{ triggerUpdate, officeHour, isLoading }}>
      {children}
    </OfficeHourUpdateContext.Provider>
  );
};
