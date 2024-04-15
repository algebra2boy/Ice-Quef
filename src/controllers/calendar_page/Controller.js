import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarPageDefaultController } from './DefaultController';

const Stack = createNativeStackNavigator();
export function CalendarPageController() {
  return (
    <Stack.Navigator
      initialRouteName="CalendarPageDefault"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="CalendarPageDefault" component={CalendarPageDefaultController} />
    </Stack.Navigator>
  );
}
