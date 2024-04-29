import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPageDefaultController } from './src/controllers/login_page/DefaultController';
import { SignupPageDefaultController } from './src/controllers/signup_page/DefaultController';
import { BottomTabNavigator } from './src/component/BottomTabNav';
import { CalendarPageController } from './src/controllers';
import ContextApp from './src/views/ContextApp';

const Stack = createNativeStackNavigator();

/**
 * A ReactElement that resembles the entire app.
 * 
 * @return { ReactElement } The entire app
 */
function App() {
  state = {
    isReady: false,
  };

  return (
    <ContextApp>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
          <Stack.Screen name="Login" component={LoginPageDefaultController}/>
          <Stack.Screen name="Signup" component={SignupPageDefaultController}/>
          <Stack.Screen name="Calendar" component={CalendarPageController}/>
          <Stack.Screen name="BottomTab" component={BottomTabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApp>
  );
}

export default App;
