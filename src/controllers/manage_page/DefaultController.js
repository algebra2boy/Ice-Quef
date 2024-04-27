import { useState, useEffect, useContext } from 'react';
import { ManagePageDefault } from '../../views/manage_page/Default';
import { LoadingPage } from '../../component/LoadingPage';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { GetUserOfficeHour } from '../../models/RegisterModel';
import { UserContext } from '../../props/UserInfo';

/**
 * The controller of the default manage page.
 * 
 * @returns { ReactElement } The default manage page.
 */
export function ManagePageDefaultController() {
  const user = useContext(UserContext);
  const userEmail = user.email; // get user email address (account name)

  const updateTrigger = useOfficeHourUpdate().updateTrigger;

  // The list of currently registered office hours
  const [officeHour, setOfficeHour] = useState([]);
  // The indicator of whether the list is loading
  const [isLoading, setIsLoading] = useState(true); // loading indicator

  // Triggers when office hour list is modified
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

  if (isLoading) {
    return <LoadingPage text="Loading office hours..." />;
  }

  return <ManagePageDefault ohList={officeHour} />;
}
