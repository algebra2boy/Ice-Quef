import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePageDefaultController } from './DefaultController';
import { ProfilePageResetPasswordController } from './ResetPassword';

// Stack Navigator for Profile Page
const Stack = createNativeStackNavigator();

/**
 * Controller for profile page
 * 
 * @returns { ReactElement } A navigator between profile pages
 */
export function ProfilePageController() {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageDefault"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="ProfilePageDefault" component={ProfilePageDefaultController} />
      <Stack.Screen
        name="ProfilePageResetPassword"
        component={ProfilePageResetPasswordController}
      />
    </Stack.Navigator>
  );
}
