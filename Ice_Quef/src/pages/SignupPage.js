import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from '../kit/AppTheme';
import { BasePage } from '../kit/BasePage';
import { KolynButton, KolynTextfield } from '../component';


const { width, height } = Dimensions.get('window');
export function SignupPage({ navigation }) {
  const themedStyles = ThemedStyles();
  const checkBoxColor = GetCheckBoxColor();
  const subColor = GetSubColor();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };
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
              <Text style={[themedStyles.title, { alignSelf: 'center' }]}>Create an account</Text>

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>User Name</Text>
              <KolynTextfield
                value={username}
                setValue={setUsername}
                placeholder=""
                keyboardType="default"
                isSecure={false}
              />

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>Email</Text>
              <KolynTextfield
                value={email}
                setValue={setEmail}
                placeholder=""
                keyboardType="email-address"
                isSecure={false}
              />

              <Text style={[themedStyles.text, { alignSelf: 'flex-start' }]}>Password</Text>
              <KolynTextfield
                value={password}
                setValue={setPassword}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />

              <FacultyInquireMark
                setChecked={setChecked}
                isChecked={isChecked}
                containerStyle={themedStyles.facultyInquire}
                checkBoxStyle={themedStyles.checkbox}
                checkBoxColor={checkBoxColor}
                subColor={subColor}
                labelStyle={themedStyles.text}
              />
            </View>
            <View style={{ top: height * 0.1 }}>
              <KolynButton text="Register" onPress={() => {}} />
              <View style={{ top: 20 }}>
                <KolynButton
                  text="Go Back"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            </View>

            <View style={{ top: '25%' }}>
              <WarningLabel
                themedStyles={themedStyles}
                onTermsOfUsePressed={onTermsOfUsePressed}
                onPrivacyPressed={onPrivacyPressed}
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

function GetCheckBoxColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.checkBoxColor;
}

function GetSubColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.subColor;
}

function FacultyInquireMark({
  setChecked,
  isChecked,
  containerStyle,
  checkBoxStyle,
  checkBoxColor,
  subColor,
  labelStyle,
}) {
  return (
    <View style={containerStyle}>
      <Checkbox
        style={checkBoxStyle}
        onValueChange={setChecked}
        color={isChecked ? checkBoxColor : subColor}
        value={isChecked}
      />
      <Text style={labelStyle}>Are you an instructor?</Text>
    </View>
  );
}

function WarningLabel({ themedStyles, onTermsOfUsePressed, onPrivacyPressed }) {
  return (
    <View>
      <Text style={themedStyles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={themedStyles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={themedStyles.link} onPress={onPrivacyPressed}>
          Privacy Policy
        </Text>
      </Text>
    </View>
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

    title: {
      fontSize: currentTheme.fontSizes.large,
      fontWeight: 'bold',
      color: currentTheme.subColor,
      margin: 20,
      fontFamily: currentTheme.mainFont,
    },

    text: {
      color: currentTheme.subColor,
      marginVertical: 10,
      fontFamily: currentTheme.mainFont,
    },

    link: {
      color: currentTheme.mainColor,
      fontFamily: currentTheme.mainFont,
    },

    facultyInquire: {
      top: 20,
      flexDirection: 'row',
      alignSelf: 'center',
    },

    checkbox: { margin: 8 },
  });
}
