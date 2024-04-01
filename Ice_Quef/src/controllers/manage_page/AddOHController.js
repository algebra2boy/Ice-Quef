import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ManagePageAddOH } from '../../views/manage_page/AddOH';
import { FetchOfficeHours } from '../../models/OfficeHourSearcher';

export function ManagePageAddOHController() {
  const [officeHour, setOfficeHour] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading indicator
  useEffect(() => {
    const fetchUserOfficeHour = async () => {
      try {
        setIsLoading(true); // Before the fetch starts
        const officeHours = await FetchOfficeHours('');
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

  return <ManagePageAddOH ohList={officeHour} />;
}
