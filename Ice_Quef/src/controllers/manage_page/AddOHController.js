import React, { useState, useEffect } from 'react';
import { ManagePageAddOH } from '../../views/manage_page/AddOH';
import { LoadingPage } from '../../component/LoadingPage';
import { PerformSearch } from '../../models/OfficeHourSearcher';

function debounce(func, wait) {
  let timeout;

  // debounce return function
  const executedFunction = (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  // cancel method to clear the timeout after
  executedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return executedFunction;
}

export function ManagePageAddOHController() {
  const [officeHour, setOfficeHour] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [facultyName, setFacultyName] = useState('');
  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  const debouncedSearchResult = debounce(async () => {
    if (!isSearching) {
      setIsSearching(true); // true if not already searched
    }

    // nothing entered yet
    if (courseCode === '' && facultyName === '') {
      setOfficeHour([]);
    } else {
      // entered something, start searching
      try {
        const fetchedOH = await PerformSearch(facultyName, courseCode);
        setOfficeHour(fetchedOH);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }
  }, 1000); // 1000 milliseconds, 3 seconds

  useEffect(() => {
    debouncedSearchResult();
    return () => debouncedSearchResult.cancel();
  }, [courseCode, facultyName]);

  return (
    <ManagePageAddOH
      isRefreshing={isRefreshing}
      setIsRefreshing={setIsRefreshing}
      isSearching={isSearching}
      officeHour={officeHour}
      setOfficeHour={setOfficeHour}
      courseCode={courseCode}
      setCourseCode={setCourseCode}
      facultyName={facultyName}
      setFacultyName={setFacultyName}
    />
  );
}
