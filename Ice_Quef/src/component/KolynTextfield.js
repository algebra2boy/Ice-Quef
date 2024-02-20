import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../kit/AppTheme';
import * as KolynStyle from '../kit/KolynStyleKit';

/**
 * Resembles a textfield with pre-existing style
 *
 * @param { string } value: State string for textfield
 * @param { func } setValue: Function to be executed after value is set
 * @param { string } placeholder: The default text for the field
 * @param { string } keyboardType: The keyboard type
 * @param { boolean } isSecure: Checks if text should be hidden
 * @param { StyleSheet } overrideStyle: When provided, overrides the existing style
 * @return { ReactElement } The textfield
 */
export function KolynTextfield({
  value,
  setValue,
  placeholder,
  keyboardType,
  isSecure,
  overrideStyle = null,
}) {
  const themedStyles = ThemedStyles();
  const placeholderColor = GetPlaceholderColor();

  return (
    <TextInput
      style={overrideStyle ? overrideStyle : themedStyles.inputTextfield}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
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
