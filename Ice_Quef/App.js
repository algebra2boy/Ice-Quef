import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, ThemeContext } from './kits/AppTheme';
import { setNavigatorTabIndex, getNavigatorTabIndex } from './props/NavigatorTabIndexController';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
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
          
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}



function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({

    bottomCircle: {
      top: -45,
      width: 80,
      height: 80,
      borderRadius: 40,
      alignSelf: 'center',
      backgroundColor: currentTheme.mainColor
    },
  
    bottomUnderline: {
      top: -25,
      width: 48,
      height: 5,
      borderRadius: 5,
      backgroundColor: currentTheme.primaryColor,
      alignSelf: 'center'
    },
  
    smallPageIcon: {
      resizeMode: 'contain',
      width: 56,
      height: 56,
      top: -30,
    },
  
    bigPageIcon: {
      top: 10,
      resizeMode: 'contain',
      width: 64,
      height: 64,
      alignSelf: 'center'
    },
  
  }));
}
