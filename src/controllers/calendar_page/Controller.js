import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarPageDefaultController } from './DefaultController';

// Stack Navigator for Calendar Page
const Stack = createNativeStackNavigator();

/**
 * Controller for calendar page
 *
 * @returns { ReactElement } A navigator between calendar pages
 */
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
