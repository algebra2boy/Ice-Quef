import { useState, useEffect, useContext } from 'react';
import { CalendarPageDefault } from '../../views/calendar_page/Default';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { LoadingPage } from '../../component/LoadingPage';
import { GetUserOfficeHour } from '../../models/RegisterModel';
import { UserContext } from '../../props/UserInfo';
import socket from '../../socket.config';

const joinStatus = {
  joined: index => `Your current position: ${index}.`,
  notJoined: pplInQueue => `${pplInQueue} ${pplInQueue === 1 ? 'person' : 'people'} in the queue`,
  isJoined: false,
};

export function CalendarPageDefaultController() {
  const user = useContext(UserContext);
  const userEmail = user.email; // get user email address (account name)
  const updateTrigger = useOfficeHourUpdate().updateTrigger;

  // Set up socket event listener for receiving response from socket server
  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  // const [registered, setRegistered] = useState([]);
  const [currStatus, setCurrStatus] = useState({
    // Initialize to 0 for testing purpose only
    message: joinStatus.notJoined(0),
    isJoined: false,
  });
  // const [isLoading, setIsLoading] = useState(true); // loading indicator

  const joinQueue = (socket, currentOfficeHourID) => {
    const joinData = {
      studentEmail: userEmail,
      officeHourID: currentOfficeHourID, //TODO: change office hour INDEX to a variable
    };

    socket.emit('join queue', joinData, response => {
      console.log('Server response:', response);
    });

    // Receive the response sent back from server after "join queue" event is sent
    socket.on('join queue response', response => {
      const { status, data, error } = response;

      if (status === 'success') {
        const queueIndex = data;

        console.log('Joined queue at position:', queueIndex);
        setCurrStatus({ ...currStatus, message: joinStatus.joined(queueIndex), isJoined: true });
        joinStatus.isJoined = true;
      } else {
        console.log(error);
      }
      // socket.close();
    });
  };

  const leaveQueue = socket => {
    if (!socket) {
      console.log('Socket not connected');
      return;
    }

    const leaveData = {
      studentEmail: userEmail,
      officeHourID: officeHour[0].id, //TODO: change office hour INDEX to a variable
    };
    socket.emit('leave queue', leaveData, response => {
      console.log('Server response:', response);
    });

    // Receive the response sent back from server after "queue queue" event is sent
    socket.on('leave queue response', response => {
      const { status, data, error } = response;

      if (status === 'success') {
        const pplInQueue = data;

        console.log('Number of people in queue:', pplInQueue);
        setCurrStatus({
          ...currStatus,
          message: joinStatus.notJoined(pplInQueue),
          isJoined: false,
        });
        joinStatus.isJoined = false;
      } else {
        console.log(error);
      }
    });
  };

  const [officeHour, setOfficeHour] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading indicator
  // the currently opened pop-up menu event
  // When a pop-up menu is closed, this event will be set to null
  // This event contains the currently inspecting office hour's id
  // as well as its time slot (precise)
  const [currentEvent, setCurrentEvent] = useState(null);

  const updatePosition = () => {
    if (currStatus.isJoined === false) {
      // waiting, so user join
      joinQueue(socket, currentEvent.id);
      console.log('Joined queue');
    } else {
      leaveQueue(socket);
    }
  };

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

  // const determineMessage = () => {
  //     if (currStatus === joinStatus.notJoined) {
  //         setCurrStatus(joinStatus.joined(1));
  //     } else {
  //         setCurrStatus(joinStatus.notJoined);
  //     }
  // };

  return (
    <CalendarPageDefault
      regLst={result}
      message={currStatus.message}
      updatePosition={updatePosition}
      setCurrentEvent={setCurrentEvent}
    />
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
          startTime[1]
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          endTime[0],
          endTime[1]
        ),
        id: oh.id
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
