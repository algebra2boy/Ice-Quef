import {useState, useEffect, useContext} from 'react';
import {CalendarPageDefault} from '../../views/calendar_page/Default';
import {useOfficeHourUpdate} from '../../props/OfficeHourContext';
import {LoadingPage} from '../../component/LoadingPage';
import {GetUserOfficeHour} from '../../models/RegisterModel';
import {UserContext} from '../../props/UserInfo';
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
    const [currStatus, setCurrStatus] = useState({
        // Initialize to 0 for testing purpose only
        message: joinStatus.notJoined(0),
        isJoined: false,
    });
    const [officeHour, setOfficeHour] = useState([]);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        const updateQueuePositions = (response) => {
            if (response.status === 'updated') {
                console.log('Queue positions updated:', response.data);
                const newPosition = response.data;

                setCurrStatus({
                    message: joinStatus.joined(newPosition),
                    isJoined: true
                });

            }
        };

        socket.on('update queue positions', updateQueuePositions);

        return () => {
            socket.off('connect');
            socket.off('update queue positions', updateQueuePositions);
        };
    }, []);

    useEffect(() => {
        if (userEmail && currentEvent && currentEvent.id) {
            const checkData = {
                studentEmail: userEmail,
                officeHourID: currentEvent.id,
            };

            socket.emit('check existence', checkData);

            socket.on('check existence response', response => {
                const { status, data, error } = response;
                if (status === 'success') {
                    if (data.isInQueue) {
                        setCurrStatus({
                            message: joinStatus.joined(data.position),
                            isJoined: true,
                        });
                    } else {
                        setCurrStatus({
                            message: joinStatus.notJoined(data.position),
                            isJoined: false,
                        });
                    }
                } else {
                    console.error(error);
                }
            });

            return () => {
                socket.off('check existence response');
            };
        }
    }, [userEmail, currentEvent]);

    const joinQueue = (currentOfficeHourID) => {
        const joinData = {
            studentEmail: userEmail,
            officeHourID: currentOfficeHourID,
        };

        socket.emit('join queue', joinData);
        socket.once('join queue response', response => {
            const {status, data, error} = response;
            if (status === 'success') {
                setCurrStatus({...currStatus, message: joinStatus.joined(data), isJoined: true});
            } else {
                console.log(error);
            }
        });
    };

    const leaveQueue = (currentOfficeHourID) => {
        const leaveData = {
            studentEmail: userEmail,
            officeHourID: currentOfficeHourID,
        };

        socket.emit('leave queue', leaveData);
        socket.once('leave queue response', response => {
            const {status, data, error} = response;
            if (status === 'success') {
                setCurrStatus({...currStatus, message: joinStatus.notJoined(data), isJoined: false});
            } else {
                console.log(error);
            }
        });
    };

    const updatePosition = () => {
        if (!currStatus.isJoined) {
            joinQueue(currentEvent.id);
        } else {
            leaveQueue(currentEvent.id);
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
        return <LoadingPage text="Loading office hours..."/>;
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
                    startTime[1],
                ),
                end: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    endTime[0],
                    endTime[1],
                ),
                id: oh.id,
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
