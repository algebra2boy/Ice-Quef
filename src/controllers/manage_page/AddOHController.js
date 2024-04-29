import { useState, useEffect } from 'react';
import { ManagePageAddOH } from '../../views/manage_page/AddOH';
import { PerformSearch } from '../../models/OfficeHourSearcher';

/**
 * The controller for add office hour page.
 * It controls: 1. searching office hour,
 * 2. adding office hour to student's registered list,
 * 3. refreshing views related to student's office hour list
 *
 * @returns The add office hour page
 */
export function ManagePageAddOHController() {
  // The list of currently student registered office hours
  const [officeHour, setOfficeHour] = useState([]);
  // The indicator for whether the search is in progress
  const [isSearching, setIsSearching] = useState(false);
  // The course code entered by student
  const [courseCode, setCourseCode] = useState('');
  // The faculty name entered by student
  const [facultyName, setFacultyName] = useState('');
  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  // The buffer zone function for optimized user searching
  // experience, the search will be performed after timeout
  const debounce = (func, wait) => {
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
  };

  // The debounced search function
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
  }, 1000); // 1000 milliseconds, 1 second

  // Re-render page when there is a change in search input(s)
  // after debounce
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
