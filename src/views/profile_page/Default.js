import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { KolynButton, KolynTitleLabel, KolynTextLabel } from '../../component';

const height = Dimensions.get('window').height;

/**
 * The default age of the profile page.
 * 
 * @param { Props } props 
 * @returns The default age of the profile page.
 */
export function ProfilePageDefault(props) {
  const themedStyles = ThemedStyles();
  const navigation = useNavigation();
  const smallFont = getSmallFont();

  const email = props.user ? props.user.email : "";
  const updateLoginStatus = 
    props.loginContext ? props.loginContext.updateLoginStatus : () => {};

  return (
    <BasePage
      components={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Profile" />

              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <KolynTextLabel text="Email " />

                  {/*
                  <EditIcon
                    onPress={()=>{}}
                  />
                  */}
                </View>
                <KolynTextLabel text={email} />
              </View>

              <View style={{ height: '10%' }} />

              <KolynButton
                extraLabelStyle={{ fontSize: smallFont }}
                text="Change password"
                onPress={() => {
                  navigation.navigate('ProfilePageResetPassword');
                }}
                testID="changePassword"
              />
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Log out"
                onPress={() => {
                  navigation.popToTop();
                  updateLoginStatus();
                }}
                testID="logoutButton"
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

/**
 * Resembles the edit icon, shape of a pen
 * 
 * @param { Func } onPress Invokes after this icon is pressed 
 * @returns 
 */
function EditIcon({ onPress }) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable style={themedStyles.editIconPart1} onPress={onPress}>
      <View style={themedStyles.editIconPart2}>
        <View style={themedStyles.editIconPart3} />
      </View>
    </Pressable>
  );
}

const getSmallFont = () => {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return currentTheme.fontSizes.small;
};

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },

    editIconPart1: {
      width: 30,
      height: 30,
      left: 10,
      borderRadius: 15,
      backgroundColor: currentTheme.mainColor,
    },

    editIconPart2: {
      width: 15,
      height: 5,
      top: 11,
      left: 8,
      backgroundColor: currentTheme.primaryColor,
      transform: [{ rotate: '135deg' }],
    },

    editIconPart3: {
      width: 0,
      height: 0,
      top: 0,
      left: 15,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 5,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: currentTheme.primaryColor, // Change color as needed,
      transform: [{ rotate: '90deg' }],
    },
  });
}
