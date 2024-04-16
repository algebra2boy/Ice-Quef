import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../style/AppTheme';


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
