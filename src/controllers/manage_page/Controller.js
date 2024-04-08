import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefaultController } from './DefaultController';
import { ManagePageAddOHController } from './AddOHController';
import { ManagePageAddConfirm } from '../../views/manage_page/AddConfirm';
import { ManagePageAddSuccess } from '../../views/manage_page/AddSuccess';
import { ManagePageAddFail } from '../../views/manage_page/AddFail';
import { ManagePageInformation } from '../../views/manage_page/Information';
import { ManagePageDeleteConfirm } from '../../views/manage_page/DeleteConfirm';
import { ManagePageDeleteSuccess } from '../../views/manage_page/DeleteSuccess';
import { ManagePageDeleteFail } from '../../views/manage_page/DeleteFail';
import { OfficeHourUpdateWrapper } from '../../props/OfficeHourContext';

const Stack = createNativeStackNavigator();

export function ManagePageController() {
  return (
    <OfficeHourUpdateWrapper>
      <Stack.Navigator
        initialRouteName="ManagePageDefault"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="ManagePageDefault" component={ManagePageDefaultController} />
        <Stack.Screen name="ManagePageAddOH" component={ManagePageAddOHController} />
        <Stack.Screen name="ManagePageAddConfirm" component={ManagePageAddConfirm} />
        <Stack.Screen name="ManagePageAddSuccess" component={ManagePageAddSuccess} />
        <Stack.Screen name="ManagePageAddFail" component={ManagePageAddFail} />
        <Stack.Screen name="ManagePageInfo" component={ManagePageInformation} />
        <Stack.Screen name="ManagePageDeleteConfirm" component={ManagePageDeleteConfirm} />
        <Stack.Screen name="ManagePageDeleteSuccess" component={ManagePageDeleteSuccess} />
        <Stack.Screen name="ManagePageDeleteFail" component={ManagePageDeleteFail} />
      </Stack.Navigator>
    </OfficeHourUpdateWrapper>
  );
}