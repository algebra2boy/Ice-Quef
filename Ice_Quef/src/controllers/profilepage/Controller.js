import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePageDefaultController } from './DefaultController';


const Stack = createNativeStackNavigator();
export function ProfilePageController() {
  
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ProfilePageDefault" component={ProfilePageDefaultController}/>

    </Stack.Navigator>
  );
}
