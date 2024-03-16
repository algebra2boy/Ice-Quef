import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefaultController } from './DefaultController';
import { ManagePageAddOHController } from './AddOHController';
import { ManagePageAddConfirm } from '../../views/managepage/AddConfirm';
import { ManagePageAddSuccess } from '../../views/managepage/AddSuccess';
import { ManagePageAddFail } from '../../views/managepage/AddFail';


const Stack = createNativeStackNavigator();
export function ManagePageController() {
  
  return (
    <Stack.Navigator
      initialRouteName="ManagePageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >

      <Stack.Screen name="ManagePageDefault" component={ManagePageDefaultController}/>
      <Stack.Screen name="ManagePageAddOH" component={ManagePageAddOHController}/>
      <Stack.Screen name="ManagePageAddConfirm" component={ManagePageAddConfirm}/>
      <Stack.Screen name="ManagePageAddSuccess" component={ManagePageAddSuccess}/>
      <Stack.Screen name="ManagePageAddFail" component={ManagePageAddFail}/>

    </Stack.Navigator>
  );
}
