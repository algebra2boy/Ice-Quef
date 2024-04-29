import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../style/AppTheme';

/**
 * A group of text that containing rules of a valid password.
 * When a requirement is fulfilled, it will have a different
 * color from the unfulfilled ones.
 *
 * @param { List } passwordHint The group of password's hints
 * @param { List } passwordConditions The group of password's fulfilling state
 * @returns { View } A view containing a group of text
 */
export function PasswordHintText({ passwordHint, passwordConditions }) {
  const themedStyles = ThemedStyles();

  return (
    <View>
      <Text style={passwordConditions[0] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[0]}
      </Text>
      <Text style={passwordConditions[1] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[1]}
      </Text>
      <Text style={passwordConditions[2] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[2]}
      </Text>
      <Text style={passwordConditions[3] ? themedStyles.hintTextPass : themedStyles.hintTextError}>
        {passwordHint[3]}
      </Text>
    </View>
  );
}

/**
 * A group of text that containing rules of a valid confirm password.
 * When a requirement is fulfilled, it will have a different
 * color from the unfulfilled ones.
 *
 * @param { List } confirmPasswordHint the group of password's hints
 * @param { List } confirmPasswordCondition the group of password's fulfilling state
 * @returns { View } A view containing a group of text
 */
export function ConfirmPasswordHintText({ confirmPasswordHint, confirmPasswordCondition }) {
  const themedStyles = ThemedStyles();

  return (
    <View>
      <Text
        style={confirmPasswordCondition ? themedStyles.hintTextPass : themedStyles.hintTextError}
      >
        {confirmPasswordHint[0]}
      </Text>
    </View>
  );
}

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
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
