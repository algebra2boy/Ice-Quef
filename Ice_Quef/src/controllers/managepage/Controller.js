import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefaultController } from './DefaultController';


const Stack = createNativeStackNavigator();
export function ManagePageController() {
  
  return (
    <Stack.Navigator
      initialRouteName="ManagePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ManagePageDefault" component={ManagePageDefaultController}/>

    </Stack.Navigator>
  );
}
