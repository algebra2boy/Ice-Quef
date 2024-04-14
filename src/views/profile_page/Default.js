import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { UserContext } from '../../props/UserInfo';
import { KolynButton, KolynTitleLabel, KolynTextLabel } from '../../component';
import { LoginContext } from '../../props/LoginContext';

const height = Dimensions.get('window').height;
export function ProfilePageDefault({}) {
  const themedStyles = ThemedStyles();
  const user = React.useContext(UserContext);
  const pass = React.useContext(LoginContext);
  const navigation = useNavigation();

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
                <KolynTextLabel text={user.email} />
              </View>

              <View style={{ height: '10%' }} />
              {/*
              <KolynButton 
                text="Change password"
                onPress={()=>{}}
              />
              */}
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Log out"
                onPress={() => {
                  navigation.popToTop();
                  pass.updateLogStatus();
                }}
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

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

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
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
