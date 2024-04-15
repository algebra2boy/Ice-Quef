import { useState, useEffect, useContext } from 'react';
import { CalendarPageDefault } from '../../views/calendar_page/Default';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { LoadingPage } from '../../component/LoadingPage';
import { GetUserOfficeHour } from '../../models/RegisterModel';
import { UserContext } from '../../props/UserInfo';

const joinStatus = {
  joined: index => `Your current position: ${index}.`,
  notJoined: 'Press to join waitlist.',
};

export function CalendarPageDefaultController() {
  const user = useContext(UserContext);
  const userEmail = user.email; // get user email address (account name)

  const updateTrigger = useOfficeHourUpdate().updateTrigger;

  // const [registered, setRegistered] = useState([]);
  const [currStatus, setCurrStatus] = useState(joinStatus.notJoined);
  // const [isLoading, setIsLoading] = useState(true); // loading indicator

  // Todo: modify queue index when changed
  const updatePosition = () => {
    const index = 1;
    setCurrStatus(joinStatus.joined(index));
  };

  const [officeHour, setOfficeHour] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading indicator

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

  useEffect(() => {
    const calculateResult = () => {
      setResult(getRenderList(officeHour));
    };

    calculateResult();
  }, [officeHour]);

  if (isLoading) {
    return <LoadingPage text="Loading office hours..." />;
  }

  const determineMessage = () => {
    if (currStatus === joinStatus.notJoined) {
      setCurrStatus(joinStatus.joined(1));
    } else {
      setCurrStatus(joinStatus.notJoined);
    }
  };

  return (
    <CalendarPageDefault regLst={result} message={currStatus} determineMessage={determineMessage} />
  );
}

/**
 * Convert a list of registered office hours into
 * renderable info. It's a list to be rendered.
 *
 * @param {*} registered a list of registered office hours
 */
const getRenderList = registered => {
  /**
   * Determine the info needed for the 'blocks'.
   * It will return a list because oh is repeated.
   *
   * @param {object} oh an office hour
   */
  const getRenderInfo = oh => {
    const getDate = myDate => {
      const date = myDate.split(':');
      var month = parseInt(date[0]) - 1;
      var day = parseInt(date[1]);
      var year = parseInt(date[2]);

      return new Date(year, month, day);
    };

    const getTime = myTime => {
      const time = myTime.split(':');
      var hour = parseInt(time[0]);
      var minute = parseInt(time[1]);

      return [hour, minute];
    };

    const getWeekDay = () => {
      return oh.day;
    };

    const addDays = (date, addition) => {
      var result = new Date(date);
      result.setDate(result.getDate() + addition);
      return result;
    };

    const hasReachTerminal = (curr, terminal) => {
      return (
        curr.getFullYear() > terminal.getFullYear() ||
        (curr.getFullYear() === terminal.getFullYear() && curr.getMonth() > terminal.getMonth()) ||
        (curr.getFullYear() === terminal.getFullYear() &&
          curr.getMonth() === terminal.getMonth() &&
          curr.getDate() > terminal.getDate())
      );
    };

    const getTitle = () => {
      const getCourse = () => {
        return oh.courseDepartment + ' ' + oh.courseNumber;
      };

      const getFacultyName = () => {
        return oh.facultyName;
      };

      return getCourse() + ', ' + getFacultyName();
    };

    const initialDate = getDate(oh.initialDate);
    const terminalDate = getDate(oh.terminalDate);
    const startTime = getTime(oh.startTime);
    const endTime = getTime(oh.endTime);
    const weekDay = getWeekDay();
    const title = getTitle();

    const info = [];
    var currentDate;
    const convertToCorrectStartDate = (curr, weekDay) => {
      var currDay = curr.getDay();
      if (currDay > weekDay) {
        return addDays(curr, 7 - (currDay - weekDay));
      } else if (currDay < weekDay) {
        return addDays(curr, weekDay - currDay);
      } else {
        return curr;
      }
    };
    for (
      currentDate = convertToCorrectStartDate(initialDate, weekDay);
      !hasReachTerminal(currentDate, terminalDate);
      currentDate = addDays(currentDate, 7)
    ) {
      info.push({
        title: title,
        start: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          startTime[0],
          startTime[1],
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          endTime[0],
          endTime[1],
        ),
      });
    }

    return info;
  };

  const result = [];
  for (var i = 0; i < registered.length; i++) {
    const renderInfo = getRenderInfo(registered[i]);
    result.push(renderInfo);
  }

  return result.flat();
};
