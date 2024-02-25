import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/kit/AppTheme'
import { 
  LoginPage, 
  SignupPage,
  HomePage 
} from './src/pages';
import { BottomTabNavigator } from './src/pages/BottomTabNav';


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
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Signup" component={SignupPage}/>
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="BottomTab" component={BottomTabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
