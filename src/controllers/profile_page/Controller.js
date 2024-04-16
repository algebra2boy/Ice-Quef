import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePageDefaultController } from './DefaultController';
import { ProfilePageResetPasswordController } from './ResetPassword';

const Stack = createNativeStackNavigator();
export function ProfilePageController() {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageDefault"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="ProfilePageDefault" component={ProfilePageDefaultController} />
      <Stack.Screen name="ProfilePageResetPassword" component={ProfilePageResetPasswordController} />
    </Stack.Navigator>
  );
}
