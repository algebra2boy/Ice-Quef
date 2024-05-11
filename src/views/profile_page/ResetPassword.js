import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { KolynTitleLabel, KolynButton, KolynTextfield, KolynTextLabel } from '../../component';
import { passwordHint, PageVariant } from '../../props/PasswordEnum';
import { PasswordHintText } from '../../component/PasswordHintText';
import { checkPassword, checkConfirmPassword } from '../../props/PasswordSetter';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

/**
 * The page for resetting password.
 *
 * @param { Props } props
 * @returns { ReactElement } The resetting password page
 */
export function ProfilePageResetPassword(props) {
  const themedStyles = ThemedStyles();
  const navigation = useNavigation();

  // For user authentication
  const passwordText = props.passwordText;
  const onChangePasswordText = props.onChangePasswordText;
  // "Set a new password"
  const repasswordText = props.repasswordText;
  const onChangeRePasswordText = props.onChangeRePasswordText;
  // "Re-enter new password"
  const rerepasswordText = props.rerepasswordText;
  const onChangeReRePasswordText = props.onChangeReRePasswordText;
  // The current page
  const pageVariant = props.pageVariant;
  // For setting a new password
  const passwordConditions = props.passwordConditions;
  const setPasswordConditions = props.setPasswordConditions;
  const setConfirmPasswordCondition = props.setConfirmPasswordCondition;

  const setNewPassword = props.setNewPassword;

  // For the following conditional rendering condition,
  // if the page is not success, it must be still staying
  // in the change password page
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
            <View style={kolynBigSector()}>
              <KolynTitleLabel title="Change password" />

              {pageVariant != PageVariant.ChangeSuccess && (
                <View>
                  <KolynTextLabel text="Enter your old password" />
                  <KolynTextfield
                    placeholder="Enter password"
                    setValue={onChangePasswordText}
                    value={passwordText}
                    isSecure={true}
                  />
                  <KolynTextLabel text="Enter your new password" />

                  <KolynTextfield
                    placeholder="Enter password"
                    setValue={input => {
                      onChangeRePasswordText(input);
                      checkPassword(input, setPasswordConditions);
                      checkConfirmPassword(
                        input,
                        repasswordText,
                        rerepasswordText,
                        false,
                        setConfirmPasswordCondition,
                      );
                    }}
                    value={repasswordText}
                    isSecure={true}
                  />

                  <PasswordHintText
                    passwordHint={passwordHint}
                    passwordConditions={passwordConditions}
                  />

                  <KolynTextLabel text="Re-enter new password" />
                  <KolynTextfield
                    placeholder="Enter password"
                    setValue={input => {
                      onChangeReRePasswordText(input);
                      checkConfirmPassword(
                        input,
                        repasswordText,
                        rerepasswordText,
                        true,
                        setConfirmPasswordCondition,
                      );
                    }}
                    value={rerepasswordText}
                    isSecure={true}
                  />

                  <View>
                    <Text style={themedStyles.hintTextError}>
                      {pageVariant}
                    </Text>
                  </View>
                </View>
              )}

              {pageVariant == PageVariant.ChangeSuccess && (
                <View>
                  <KolynTextLabel text={pageVariant} />
                </View>
              )}
            </View>

            <View style={kolynSmallSector()}>
              {pageVariant != PageVariant.ChangeSuccess && (
                <View>
                  <KolynButton
                    onPress={setNewPassword}
                    text={'Next'}
                  />
                </View>
              )}
              {pageVariant == PageVariant.ChangeSuccess && (
                <View>
                  <KolynButton
                    onPress={() => {
                      navigation.goBack();
                    }}
                    text={'Next'}
                  />
                </View>
              )}

              <View style={{ top: 20 }}>
                {pageVariant != PageVariant.ChangeSuccess && (
                  <View>
                    <KolynButton
                      onPress={() => {
                        navigation.goBack();
                      }}
                      text={'Cancel'}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
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
  });
}
