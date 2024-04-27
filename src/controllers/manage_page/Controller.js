import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManagePageDefaultController } from './DefaultController';
import { ManagePageAddOHController } from './AddOHController';
import { ManagePageAddSuccess } from '../../views/manage_page/AddSuccess';
import { ManagePageAddFail } from '../../views/manage_page/AddFail';
import { ManagePageInformation } from '../../views/manage_page/Information';
import { ManagePageDeleteSuccess } from '../../views/manage_page/DeleteSuccess';
import { ManagePageDeleteFail } from '../../views/manage_page/DeleteFail';
import { ManagePageDeleteConfirmController } from './DeleteConfirmController';
import { ManagePageAddConfirmController } from './AddConfirmController';

// Stack Navigator for Manage Page
const Stack = createNativeStackNavigator();

/**
 * Controller for manage page
 *
 * @returns { ReactElement } A navigator between manage pages
 */
export function ManagePageController() {
  return (
    <Stack.Navigator
      initialRouteName="ManagePageDefault"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="ManagePageDefault" component={ManagePageDefaultController} />
      <Stack.Screen name="ManagePageAddOH" component={ManagePageAddOHController} />
      <Stack.Screen name="ManagePageAddConfirm" component={ManagePageAddConfirmController} />
      <Stack.Screen name="ManagePageAddSuccess" component={ManagePageAddSuccess} />
      <Stack.Screen name="ManagePageAddFail" component={ManagePageAddFail} />
      <Stack.Screen name="ManagePageInfo" component={ManagePageInformation} />
      <Stack.Screen name="ManagePageDeleteConfirm" component={ManagePageDeleteConfirmController} />
      <Stack.Screen name="ManagePageDeleteSuccess" component={ManagePageDeleteSuccess} />
      <Stack.Screen name="ManagePageDeleteFail" component={ManagePageDeleteFail} />
    </Stack.Navigator>
  );
}
