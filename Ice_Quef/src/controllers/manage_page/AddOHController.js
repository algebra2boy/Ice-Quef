import React, { useState, useEffect } from 'react';
import { ManagePageAddOH } from '../../views/manage_page/AddOH';
import { FetchOfficeHours } from '../../models/OfficeHourSearcher';
import { LoadingPage } from '../../component/LoadingPage';

export function ManagePageAddOHController() {
  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator
  const [userInput, setUserInput] = useState('');

  // Todo: set office hour list whenever user input changes

  useEffect(() => {
    const fetchUserOfficeHour = async () => {
      try {
        setIsLoading(true); // Before the fetch starts
        //const officeHours = await FetchOfficeHours(''); // attempting to fetch without email - this is wrong
        //setOfficeHour(officeHours);
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

  return <ManagePageAddOH ohList={officeHour} text={userInput} setText={setUserInput} />;
}
