import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefault } from './Default';

const Stack = createNativeStackNavigator();
export function ManagePage() {
  
  return (
    <Stack.Navigator
      initialRouteName="ManagePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ManagePageDefault" component={ManagePageDefault}/>

    </Stack.Navigator>
  );
}
