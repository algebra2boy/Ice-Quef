import {
  waitFor, 
  fireEvent,
  cleanup,
  render, 
  LoginPageDefault, 
} from './index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loginStatus } from '../props/LoginContext';
import { SignupPageDefaultController } from '../controllers/signup_page/DefaultController';
import { CalendarPageDefaultController } from '../controllers/calendar_page/DefaultController';
import { BottomTabNavigator } from '../component/BottomTabNav';
import { screen } from '@testing-library/react-native'

afterEach(cleanup);

describe("log in page", () => {
  it("goes from log in page to calendar page", async () => {
    const Stack = createNativeStackNavigator();

    render(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
          <Stack.Screen 
            name="Login" 
          >
            {()=>(
              <LoginPageDefault 
                pressLogInButton={() => true}
                status={loginStatus.success} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Calendar"
            component={CalendarPageDefaultController}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("loginButton"));
    });
    await waitFor(() => {
      const elementWithTestId = screen.queryByTestId('loginButton');
      expect(elementWithTestId).toBeNull();
    });
  });

  it("goes from log in page to sign up page", async () => {
    const Stack = createNativeStackNavigator();

    render(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginPageDefault} 
          />
          <Stack.Screen
            name="Signup"
            component={SignupPageDefaultController}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("signupButton"));
    });
    await waitFor(() => {
      expect(screen.getByTestId("gobackButton")).toBeOnTheScreen();
    });
  });
});

describe("sign up page", () => {
  it("goes from sign up page back to log in page", async () => {
    const Stack = createNativeStackNavigator();

    render(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginPageDefault} 
          />
          <Stack.Screen
            name="Signup"
            component={SignupPageDefaultController}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("gobackButton"));
    });
    await waitFor(() => {
      const elementWithTestId = screen.queryByTestId('gobackButton');
      expect(elementWithTestId).toBeNull();
    });
  });
});
