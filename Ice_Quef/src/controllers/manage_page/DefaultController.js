import React, { useEffect, useState, useContext } from 'react';
import { ManagePageDefault } from '../../views/manage_page/Default';
import { GetUserOfficeHour } from '../../models/RegisterModel';
import { UserContext } from '../../props/UserInfo';
import { LoadingPage } from '../../component/LoadingPage';

export function ManagePageDefaultController() {
  const user = useContext(UserContext);
  const userEmail = user.email; // get user email address (account name)

  // The list of office hour that the student has currently enrolled
  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator

  useEffect(() => {
    const fetchUserOfficeHour = async () => {
      try {
        setIsLoading(true); // Before the fetch starts
        const officeHours = await GetUserOfficeHour(userEmail);
        setOfficeHour(officeHours);
        // console.log(officeHours);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // fetch is complete or if there is an error
      }
    };

    fetchUserOfficeHour();
  }, []);

  if (isLoading) {
    return <LoadingPage text="Loading office hours..." />;
  }

  return <ManagePageDefault ohList={officeHour} />;
}
