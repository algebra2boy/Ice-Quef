import {OfficeHour} from '../dataclass/OfficeHour';
import ServerAddress from "../props/Server";

export function GetSampleList() {
    return [
        new OfficeHour('John Doe', 1, '14:30', '15:30', '02:01:2024', '05:08:2024', 'CS', "100", 1),
        new OfficeHour('Jane Doe', 3, '16:00', '18:00', '02:01:2024', '05:08:2024', 'Chem', "100", 2),
        new OfficeHour('Ranbo', 1, '16:00', '18:00', '02:01:2024', '05:08:2024', 'PHYS', "200", 3),
        new OfficeHour('Ranbo', 4, '13:00', '14:00', '02:01:2024', '05:08:2024', 'PHYS', "200", 4),
    ];
}


// get user's office hour from backend
export async function GetUserOfficeHour(email) {
    try {
        const response = await fetch(ServerAddress() + `api/officeHour/list?email=${email}`);

        // check if the response is successful
        if (!response.ok) {
            // Handling different types of errors based on HTTP status codes
            switch (response.status) {
                case 400:
                    // Could specify further based on response body if the API provides different error messages
                    const errorData = await response.json();
                    if (errorData.message.includes("email is not valid")) {
                        throw new Error('invalid email');
                    } else if (errorData.message.includes("office hour document is not found")) {
                        throw new Error('no office');
                    } else if (errorData.message.includes("office hour array ids is not found")) {
                        throw new Error('no office hour array ids');
                    } else {
                        throw new Error('An error occurred');
                    }

                case 404:
                    throw new Error('The requested resource was not found');
                case 500:
                    throw new Error('The server encountered an error');
                default:
                    throw new Error('An unexpected error occurred');
            }
        }
        const data = await response.json();

        // Assuming we want to transform the fetched data into instances of the OfficeHour class
        const userOfficeHours = data.officeHours.map(oh => new OfficeHour(
            oh.facultyName,
            oh.day,
            oh.startTime,
            oh.endTime,
            formatDate(oh.startDate), // mm:dd:yyyy
            formatDate(oh.endDate),   //  mm:dd:yyyy
            oh.courseDepartment,
            oh.courseNumber,
            oh.id
        ));
        console.log("Load Office Hour")
        return userOfficeHours;

    } catch (error) {
        console.error(error);
        return [];
    }
}

// date from yyyy-mm-dd to mm:dd:yyyy
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}:${day}:${year}`;
}
