import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../style/AppTheme';
import * as KolynStyle from '../style/KolynStyleKit';

/**
 * Resembles a textfield with pre-existing style
 *
 * @param { string } value: State string for textfield
 * @param { func } setValue: Function to be executed after value is set
 * @param { string } placeholder: The default text for the field
 * @param { string } keyboardType: The keyboard type (default="default")
 * @param { boolean } isSecure: Checks if text should be hidden (default=false)
 * @param { StyleSheet } overrideStyle: When provided, overrides the existing style
 * @return { ReactElement } The textfield
 */
export function KolynTextfield({
  value,
  setValue: onChangeText,
  placeholder,
  keyboardType = 'default',
  isSecure = false,
  overrideStyle = null,
}) {
  const themedStyles = ThemedStyles();
  const placeholderColor = GetPlaceholderColor();

  return (
    <TextInput
      style={overrideStyle ? overrideStyle : themedStyles.inputTextfield}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
      textContentType="oneTimeCode"
    />
  );
}

function GetPlaceholderColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.disableColor;
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    inputTextfield: StyleSheet.flatten([
      { height: 40, width: 300 },
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),
  });
}
