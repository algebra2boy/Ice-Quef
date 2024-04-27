import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { KolynTitleLabel, KolynButton, KolynTextfield, KolynTextLabel } from '../../component';
import { passwordHint, confirmPasswordHint, PageVariant } from '../../props/PasswordEnum';
import { PasswordHintText, ConfirmPasswordHintText } from '../../component/PasswordHintText';
import { checkPassword, checkConfirmPassword } from '../../props/PasswordSetter';

const height = Dimensions.get('window').height;

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
  const onChangePageVariant = props.onChangePageVariant;
  // For setting a new password
  const passwordConditions = props.passwordConditions;
  const setPasswordConditions = props.setPasswordConditions;
  const confirmPasswordCondition = props.confirmPasswordCondition;
  const setConfirmPasswordCondition = props.setConfirmPasswordCondition;

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
              <KolynTitleLabel title="Change password" />

              {pageVariant == PageVariant.NewPassword && (
                <View>
                  <KolynTextLabel text="Enter your old password" />
                  <KolynTextfield
                    placeholder="Enter password"
                    setValue={onChangePasswordText}
                    value={passwordText}
                    isSecure={true}
                  />
                  <KolynTextLabel text={pageVariant} />

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
                  <ConfirmPasswordHintText
                    confirmPasswordHint={confirmPasswordHint}
                    confirmPasswordCondition={confirmPasswordCondition}
                  />
                </View>
              )}

              {pageVariant == PageVariant.ChangeSuccess && (
                <View>
                  <KolynTextLabel text={pageVariant} />
                </View>
              )}
            </View>

            <View style={{ top: height * 0.1 }}>
              {pageVariant == PageVariant.NewPassword && (
                <View>
                  <KolynButton
                    onPress={() => {
                      onChangePageVariant(PageVariant.ChangeSuccess);
                    }}
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
  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
  });
}
