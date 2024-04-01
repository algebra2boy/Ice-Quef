import React, { useEffect, useState, useContext } from 'react';
import { ManagePageDefault } from '../../views/manage_page/Default';
import { GetUserOfficeHour } from '../../models/RegisterModel';
import { UserContext } from '../../props/UserInfo';
import { View, Text } from 'react-native';

export function ManagePageDefaultController() {
  const userManager = useContext(UserContext);
  const userEmail = userManager.user; // get user email address (account name)

  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator

  useEffect(() => {
    const fetchUserOfficeHour = async () => {
      try {
        setIsLoading(true); // Before the fetch starts
        const officeHours = await GetUserOfficeHour(userEmail);
        setOfficeHour(officeHours);
        // console.log(officeHours);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // fetch is complete or if there is an error
      }
    };

    fetchUserOfficeHour();
  }, []);

  if (isLoading) {
    //TODO: need to change this style in the future, I just put plain text for rn
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading office hours...</Text>
      </View>
    );
  }

  return <ManagePageDefault ohList={officeHour} />;
}
