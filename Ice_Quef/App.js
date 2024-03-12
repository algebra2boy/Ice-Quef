import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/style/AppTheme'
import { LoginPageDefaultController } from './src/controllers/loginpage/DefaultController';
import { SignupPageDefaultController } from './src/controllers/signuppage/DefaultController';
import { BottomTabNavigator } from './src/component/BottomTabNav';
import { HomePageController } from './src/controllers';


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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
          <Stack.Screen name="Login" component={LoginPageDefaultController}/>
          <Stack.Screen name="Signup" component={SignupPageDefaultController}/>
          <Stack.Screen name="Home" component={HomePageController}/>
          <Stack.Screen name="BottomTab" component={BottomTabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
