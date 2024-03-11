import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePageDefaultController } from './DefaultController';

const Stack = createNativeStackNavigator();
export function HomePageController() {
  
  return (
    <Stack.Navigator
      initialRouteName="HomePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="HomePageDefault" component={HomePageDefaultController}/>

    </Stack.Navigator>
  );
}
