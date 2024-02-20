import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/kit/AppTheme'
import { 
  LoginPage, 
  SignupPage 
} from './src/pages';


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
          
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
