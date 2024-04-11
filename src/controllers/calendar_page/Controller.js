import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarPageDefaultController } from './DefaultController';
import { OfficeHourUpdateWrapper } from '../../props/OfficeHourContext';

const Stack = createNativeStackNavigator();
export function CalendarPageController() {
  return (
    <OfficeHourUpdateWrapper>
      <Stack.Navigator
        initialRouteName="CalendarPageDefault"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="CalendarPageDefault" component={CalendarPageDefaultController} />
      </Stack.Navigator>
    </OfficeHourUpdateWrapper>
  );
}
