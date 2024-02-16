import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../kit/AppTheme';
import * as KolynStyle from '../kit/KolynStyleKit';


export function KolynTextfield({ value, setValue, placeholder, keyboardType, isSecure, overrideStyle=null }) {
  const themedStyles = ThemedStyles();
  
  return (
    <TextInput
      style={ overrideStyle ? 
              overrideStyle : 
              themedStyles.inputTextfield }
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
    />
  );
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
