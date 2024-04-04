import { OfficeHour } from '../dataclass/OfficeHour';
import ServerAddress from '../props/Server';

/**
 * Perform a search based on given user input and find all matching
 * office hours and return them.
 *
 * @param { String } userInput the text entered by the user
 * @param { List } officeHours the entire list of office hours
 * @return { List } matchOfficeHours an list of office hours that
 *                   match the given input to be used for display
 */
export function PerformSearch(userInput, officeHours) {}

export async function FetchOfficeHours(addressFilter = '') {
  try {
    const response = await fetch(ServerAddress() + `api/officeHour/list${addressFilter}`);

    // check if the response is successful
    if (!response.ok) {
      // handle depends on HTTP status codes
      switch (response.status) {
        case 400:
          // Could specify further based on response body if the API provides different error messages
          const errorData = await response.json();
          if (errorData.message.includes('email is not valid')) {
            throw new Error('invalid email');
          } else if (errorData.message.includes('office hour document is not found')) {
            throw new Error('no office');
          } else if (errorData.message.includes('office hour list ids is not found')) {
            throw new Error('no office hour list ids');
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
    const userOfficeHours = data.officeHours.map(
      oh =>
        new OfficeHour(
          oh.facultyName,
          oh.day,
          oh.startTime,
          oh.endTime,
          formatDate(oh.startDate), // mm:dd:yyyy
          formatDate(oh.endDate), //  mm:dd:yyyy
          oh.courseDepartment,
          oh.courseNumber,
          oh.id,
        ),
    );
    // console.log("Load Office Hour")
    return userOfficeHours;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// date from yyyy-mm-dd to mm:dd:yyyy
const formatDate = dateString => {
  const [year, month, day] = dateString.split('-');
  return `${month}:${day}:${year}`;
};
