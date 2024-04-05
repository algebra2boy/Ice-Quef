import React, {useState, useEffect} from 'react';
import {ManagePageAddOH} from '../../views/manage_page/AddOH';
import {LoadingPage} from '../../component/LoadingPage';
import {PerformSearch} from '../../models/OfficeHourSearcher';

function debounce(func, wait) {
    let timeout;

    // debounce return function
    const executedFunction = function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

    // cancel method to clear the timeout after
    executedFunction.cancel = function () {
        clearTimeout(timeout);
    };

    return executedFunction;
}


export function ManagePageAddOHController() {
    const [officeHour, setOfficeHour] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // initial loading indicator
    const [isSearching, setIsSearching] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [facultyName, setFacultyName] = useState('');

    const debouncedSearchResult = debounce(async () => {
        if (!isSearching) setIsSearching(true); // true if not already searched
        try {
            const fetchedOH = await PerformSearch(facultyName, courseCode);
            setOfficeHour(fetchedOH);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
            setIsLoading(false);
        }
    }, 3000); // 3000 milliseconds, 3 seconds

    useEffect(() => {
        debouncedSearchResult();
        return () => debouncedSearchResult.cancel();
    }, [courseCode, facultyName]);

    if (isLoading) {
        return <LoadingPage text="Loading office hours..."/>;
    } else if (isSearching) {
        return <LoadingPage text="Searching..."/>;
    }

    return (
        <ManagePageAddOH
            officeHour={officeHour}
            setOfficeHour={setOfficeHour}
            courseCode={courseCode}
            setCourseCode={setCourseCode}
            facultyName={facultyName}
            setFacultyName={setFacultyName}
        />
    );
}
