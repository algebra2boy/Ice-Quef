import React, { useState, useEffect } from 'react';
import { ManagePageAddOH } from '../../views/manage_page/AddOH';
import { LoadingPage } from '../../component/LoadingPage';
import { PerformSearch } from '../../models/OfficeHourSearcher';

export function ManagePageAddOHController() {
  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator
  const [courseCode, setCourseCode] = useState('');
  const [facultyName, setFacultyName] = useState('');

  // Todo: set office hour list whenever user input changes

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        // console.log("Course: " + courseCode + "| Faculty: " + facultyName);
        // setIsLoading(true); // Before the fetch starts
        const fetchedOH = await PerformSearch("100");
        console.log(fetchedOH);
        setOfficeHour(fetchedOH);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // fetch is complete or if there is an error
      }
    };

    getSearchResult();
  }, [courseCode, facultyName]);

  if (isLoading) {
    return <LoadingPage text="Loading office hours..." />;
  }

  return (
    <ManagePageAddOH
      ohList={officeHour}
      courseCode={courseCode}
      setCourseCode={setCourseCode}
      facultyName={facultyName}
      setFacultyName={setFacultyName}
      />
  );
}
