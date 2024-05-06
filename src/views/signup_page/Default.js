import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemeContext } from '../../style/AppTheme';
import { BasePage } from '../../style/BasePage';
import { KolynButton, KolynTextfield, KolynTitleLabel, KolynTextLabel } from '../../component';
import { passwordHint, confirmPasswordHint } from '../../props/PasswordEnum';
import { PasswordHintText, ConfirmPasswordHintText } from '../../component/PasswordHintText';
import { checkPassword, checkConfirmPassword } from '../../props/PasswordSetter';

const height = Dimensions.get('window').height;
// The hints for email
const emailHint = {
  0: 'Enter your UMass email',
};

/**
 * Resembles the default sign up page.
 *
 * @param {Props} props
 * @returns { ReactElement } The default sign up page
 */
export function SignupPageDefault(props) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

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
              <KolynTitleLabel title="Create an account" />
              <KolynTextLabel text="Email" />
              <KolynTextfield
                value={props.email}
                setValue={email => {
                  props.setEmail(email);
                  props.checkEmail(email);
                }}
                placeholder=""
                keyboardType="email-address"
                isSecure={false}
              />
              <EmailHintText
                themedStyles={themedStyles}
                emailHint={emailHint}
                emailCondition={props.emailCondition}
              />

              <KolynTextLabel text="Password" />
              <KolynTextfield
                value={props.password}
                setValue={password => {
                  props.setPassword(password);
                  checkPassword(password, props.setPasswordConditions);
                  checkConfirmPassword(
                    password,
                    password,
                    props.repassword,
                    false,
                    props.setConfirmPasswordCondition,
                  );
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />
              <PasswordHintText
                passwordHint={passwordHint}
                passwordConditions={props.passwordConditions}
              />

              <KolynTextLabel text="Confirm Password" />
              <KolynTextfield
                value={props.repassword}
                setValue={repassword => {
                  props.setRePassword(repassword);
                  checkConfirmPassword(
                    repassword,
                    props.password,
                    repassword,
                    true,
                    props.setConfirmPasswordCondition,
                  );
                }}
                placeholder=""
                keyboardType="default"
                isSecure={true}
              />
              <ConfirmPasswordHintText
                confirmPasswordHint={confirmPasswordHint}
                confirmPasswordCondition={props.confirmPasswordCondition}
              />
            </View>
            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Register"
                onPress={() => {
                  props.onRegisterPressed();
                }}
                testID="registerButton"
              />
              <View style={{ top: 20 }}>
                <KolynButton
                  text="Go Back"
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      navigation.navigate("Login");
                    }
                  }}
                  testID="gobackButton"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

/**
 * The hint view for email input textfield.
 *
 * @param { Style } themedStyles The style for this view
 * @param { List } emailHint The list of email hints
 * @param { boolean } emailCondition The current email's condition indicated by a boolean
 * @returns { View } The view for email hint
 */
function EmailHintText({ themedStyles, emailHint, emailCondition }) {
  return (
    <View>
      <Text style={emailCondition ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {emailHint[0]}
      </Text>
    </View>
  );
}

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },

    hintTextError: {
      color: currentTheme.errorColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny,
    },

    hintTextPass: {
      color: currentTheme.mainColor,
      marginVertical: 5,
      fontFamily: currentTheme.mainFont,
      fontSize: currentTheme.fontSizes.tiny,
    },
  });
}
