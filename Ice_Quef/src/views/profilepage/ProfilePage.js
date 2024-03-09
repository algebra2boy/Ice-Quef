import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePageDefault } from './Default';


const Stack = createNativeStackNavigator();
export function ProfilePage() {
  
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ProfilePageDefault" component={ProfilePageDefault}/>

    </Stack.Navigator>
  );
}
