import ServerAddress from './Server';

/**
 * Function used to add an office hour
 * 
 * @param { string } userToken 
 * @param { string } officeHourID 
 * @returns { boolean } True if addition was successful, false otherwise
 */
export async function addUserOfficeHour(userToken, officeHourID) {
  const requestURL = ServerAddress() + `api/officeHour/add/${officeHourID}`;
  try {
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    const data = await response.json();

    if (response.status === 201) {
      console.log(data.message); // addition was successful
      return true;
    } else {
      console.error(data.message);
      return false; // not successful
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
}

/**
 * Function used to remove an office hour
 * 
 * @param { string } userToken 
 * @param { string } officeHourID 
 * @returns { boolean } True if removal was successful, false otherwise
 */
export async function deleteUserOfficeHour(userToken, officeHourID) {
  const requestURL = ServerAddress() + `api/officeHour/remove/${officeHourID}`;
  try {
    const response = await fetch(requestURL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data); // deletion was successful
      return true;
    } else {
      console.error(data);
      return false; //  not successful
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
}
