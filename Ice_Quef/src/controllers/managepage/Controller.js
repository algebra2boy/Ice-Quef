import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefaultController } from './DefaultController';
import { ManagePageAddOHController } from './AddOHController';


const Stack = createNativeStackNavigator();
export function ManagePageController() {
  
  return (
    <Stack.Navigator
      initialRouteName="ManagePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ManagePageDefault" component={ManagePageDefaultController}/>
      <Stack.Screen name="ManagePageAddOH" component={ManagePageAddOHController}/>

    </Stack.Navigator>
  );
}
