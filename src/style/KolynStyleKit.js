import { Dimensions, Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export function kolynScreen(screenBackground) {
  return {
    flex: 1,
    padding: 24,
    backgroundColor: screenBackground,
  };
}

export function kolynPrimaryColorScreen(primaryColor) {
  return {
    flex: 1,
    width: width,
    height: height,
    alignSelf: 'center',
    backgroundColor: primaryColor,
  };
}

export function kolynInputTextfield(background, font) {
  return {
    margin: 12,
    backgroundColor: background,
    padding: 10,
    fontFamily: font,
    alignSelf: 'center',
    borderRadius: 10,
  };
}

export function kolynButton(buttonBackground) {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 1,
    elevation: 3,
    backgroundColor: buttonBackground,
    alignSelf: 'center',
    borderRadius: 10,
  };
}

export function kolynLabel(fontSize, font, fontColor) {
  return {
    fontSize: fontSize,
    fontFamily: font,
    color: fontColor,
  };
}

export function kolynDivider(color) {
  return {
    width: width,
    height: 20,
    backgroundColor: color,
    alignSelf: 'center',
  };
}

export function kolynSector(webFlex, style=null) {
  return StyleSheet.flatten([
    Platform.OS === 'web' ? { flex: webFlex } : style
  ]);
}

export function kolynBigSector() {
  return Platform.OS === 'web' ? { flex: 7 } : { height: height * 0.5 };
}

export function kolynSmallSector() {
  return Platform.OS === 'web' ? { flex: 1 } : { top: height * 0.1 };
}

export function kolynSmallSectorOr(style) {
  return (
    Platform.OS === 'web' ? { flex: 1 } : style
  );
}
