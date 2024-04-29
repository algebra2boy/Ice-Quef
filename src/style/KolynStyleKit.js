import { Dimensions } from 'react-native';

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
