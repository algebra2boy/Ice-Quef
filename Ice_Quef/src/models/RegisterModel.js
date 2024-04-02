import { OfficeHour } from '../dataclass/OfficeHour';
import { FetchOfficeHours } from './OfficeHourSearcher';

/**
 * A stub list used for testing prior to connect to back end
 *
 * @returns an list of mock up office hour
 */
export const GetSampleList= () => {
  return [
    new OfficeHour('John Doe', 1, '14:30', '15:30', '02:01:2024', '05:08:2024', 'CS', '100', 1),
    new OfficeHour('Jane Doe', 3, '16:00', '18:00', '02:01:2024', '05:08:2024', 'Chem', '100', 2),
    new OfficeHour('Ranbo', 1, '16:00', '18:00', '02:01:2024', '05:08:2024', 'PHYS', '200', 3),
    new OfficeHour('Ranbo', 4, '13:00', '14:00', '02:01:2024', '05:08:2024', 'PHYS', '200', 4),
  ];
};

// get user's office hour from backend
export async function GetUserOfficeHour(email) {
  try {
    const result = await FetchOfficeHours(`?email=${email}`);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
