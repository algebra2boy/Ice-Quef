import { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '../style/AppTheme';
import { setNavigatorTabIndex, getNavigatorTabIndex } from '../props/NavigatorTabIndexController';
import {
  CalendarPageController,
  ManagePageController,
  ProfilePageController,
} from '../controllers';

// Creates a bottom tab navigator
const Tab = createBottomTabNavigator();

// The images for the bottom tab navigator
const images = [
  require('../../assets/images/calendar.png'),
  require('../../assets/images/cog.png'),
  require('../../assets/images/profile.png'),
];

/**
 * Responsible for the bottom tab navigation bar in the main screen.
 * Three buttons: 1. Calendar, 2. Manage, 3. Profile
 *
 * @returns { ReactElement } Bottom tab navigator in main screen
 */
export function BottomTabNavigator() {
  const themedStyles = ThemedStyles();
  const mainColor = GetMainColor();

  // Tab navigator does not accept custom components
  // so the code cannot be refactored to use a custom component
  return (
    <Tab.Navigator
      screenOptions={() => ({
        showLabel: false,
        headerShown: false,
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: mainColor,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: mainColor,
          paddingHorizontal: 10,
          height: 120,
        },
        gestureEnabled: false,
      })}
    >
      <Tab.Screen
        name="Calendar"
        options={{
          animation: 'none',
          tabBarIcon: () => (
            <View>
              <Image source={images[0]} style={themedStyles.smallPageIcon}></Image>
              {getNavigatorTabIndex() == 0 && <View style={themedStyles.bottomUnderline} />}
            </View>
          ),
          tabBarLabel: '',
        }}
        component={CalendarPageController}
        listeners={{
          tabPress: () => {
            setNavigatorTabIndex(0);
          },
        }}
      />

      <Tab.Screen
        name="Manage"
        options={{
          animation: 'none',
          tabBarIcon: () => (
            <View>
              <Image source={images[1]} style={themedStyles.smallPageIcon}></Image>
              {getNavigatorTabIndex() == 1 && <View style={themedStyles.bottomUnderline} />}
            </View>
          ),
          tabBarLabel: '',
        }}
        component={ManagePageController}
        listeners={{
          tabPress: () => {
            setNavigatorTabIndex(1);
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          animation: 'none',
          tabBarIcon: () => (
            <View>
              <Image source={images[2]} style={themedStyles.smallPageIcon}></Image>
              {getNavigatorTabIndex() == 2 && <View style={themedStyles.bottomUnderline} />}
            </View>
          ),
          tabBarLabel: '',
        }}
        component={ProfilePageController}
        listeners={{
          tabPress: () => {
            setNavigatorTabIndex(2);
          },
        }}
      />
    </Tab.Navigator>
  );
}

const GetMainColor = () => {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.mainColor;
};

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    bottomUnderline: {
      top: -15,
      width: 48,
      height: 5,
      borderRadius: 5,
      backgroundColor: currentTheme.primaryColor,
      alignSelf: 'center',
    },

    smallPageIcon: {
      resizeMode: 'contain',
      width: 56,
      height: 56,
      top: -20,
    },
  });
}
