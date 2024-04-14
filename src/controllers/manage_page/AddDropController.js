import ServerAddress from '../../props/Server';

export async function addUserOfficeHour(userEmail, userToken, officeHourID) {
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
      // adding OH is successful
      console.log(data.message);
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
      console.log(data); // deletion is successful
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
