import * as React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, 
  interpolate, 
  useAnimatedStyle, 
  useDerivedValue, 
  withTiming,
  withRepeat } from 'react-native-reanimated';
import * as KolynStyle from '../kits/KolynStyleKit';
import { ThemeContext } from '../kits/AppTheme';
import { SpringButton } from '../kits/SpringButton';


const {width} = Dimensions.get('window');

/* The icon & title image */
export function KolynMainTitleImage() {
  const themedStyles = ThemedStyles();

  return (
    <Image
      source={require('../assets/main-title.png')}
      style={themedStyles.mainTitle}
    />
  );
}

export function KolynTopTitleLabel({ text }) {
  const themedStyles = ThemedStyles();

  return (
    <View
      style={themedStyles.topTitle}>
      <Text style={themedStyles.topTitleLabel}>{text}</Text>
    </View>
  );
}

export function KolynSubtitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return (
    <Text style={themedStyles.subtitle}>
      {title}
    </Text>
  );
}

/* Navigate to 'Switch Course' page when pressed */
/* By default, background white, foreground blue */
export function KolynSwitchCourseButton({onPress}) {
  const themedStyles = ThemedStyles();

  return (
    <SpringButton
      text="Switch course"
      onPress={onPress}
      buttonStyle={themedStyles.switchCourseButton}
      labelStyle={themedStyles.switchCourseButtonLabel}
    />
  );
}

export function KolynSwitchCourseButton2({onPress}) {
  const themedStyles = ThemedStyles();

  return (
    <SpringButton
      text="Switch course"
      onPress={onPress}
      buttonStyle={themedStyles.switchCourseButton2}
      labelStyle={themedStyles.switchCourseButtonLabel2}
    />
  );
}

export function KolynCasualButton({onPress, text}) {
  const themedStyles = ThemedStyles();

  return (
    <SpringButton
      text={text}
      onPress={onPress}
      buttonStyle={themedStyles.casualButton}
      labelStyle={themedStyles.casualButtonLabel}
    />
  );
}

/* Used to display both the course title, instructor name, and course period */
export function KolynCourseLabel({ courseText, onChangeCourseText, text, textColor }) {
  const themedStyles = ThemedStyles();

  return (
    <TextInput
      editable={false}
      style={[themedStyles.courseLabel, {color: textColor}]}
      value={text}
      onChangeText={onChangeCourseText}
    >
    </TextInput>
  );
}

export function KolynBluetoothScanIcon({ enableCircularRotation }) {
  const themedStyles = ThemedStyles();

  const animation = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, Math.PI/2], [0, 2 * Math.PI]);
  });

  const rotation2 = useDerivedValue(() => {
    return interpolate(animation.value, [0, -Math.PI/2], [0, 3 * Math.PI]);
  });

  const anchorPointX = 0;
  const anchorPointY = 0;

  const transformOriginWorklet = (
    anchorPoint,
    originalCenterPoint,
    transforms,
  ) => {
    'worklet';
    const result = [
      {translateY: anchorPoint.y - originalCenterPoint.y},
      ...transforms,
      {translateY: -(anchorPoint.y - originalCenterPoint.y)},
    ];
    return result;
  };

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: transformOriginWorklet(
        {x: anchorPointX, y: anchorPointY},
        {x: 100 / 2.0, y: 100 / 2.0},
        [{rotateZ: `${rotation2.value}deg`}],
      )
    }
  });

  const animationStyle2 = useAnimatedStyle(() => {
    return {
      transform: transformOriginWorklet(
        {x: anchorPointX, y: anchorPointY},
        {x: 390 / 2.0, y: 390 / 2.0},
        [{rotateZ: `${rotation.value}deg`}],
      )
    }
  });

  const startAnimation = () => {
    animation.value = withRepeat(withTiming(360, {
      duration: 16000
    }), -1);
  }

  const endAnimation = () => {
    isAnimationStarted = false;
    animation.value = 0;
  }

  if (enableCircularRotation) {
    startAnimation();
  }
  else {
    endAnimation();
  }

  return (
      <View>
        <Image 
          source={require('../assets/BSCenter.png')}
          style={themedStyles.bluetoothCenter}
        />
        <Animated.View style={animationStyle}>
          <Image 
            source={require('../assets/BSInner.png')}
            style={[themedStyles.bluetoothInner]}
          />
        </Animated.View>
        <Animated.View style={animationStyle2}>
          <Image 
            source={require('../assets/BSOuter.png')}
            style={themedStyles.bluetoothOuter}
          />
        </Animated.View>
      </View>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({
    
    mainTitle: {
      resizeMode: 'contain',
      width: 400,
      height: width*0.2,
      alignSelf: 'center',
    },
  
    topTitle: {color: currentTheme.mainColor},
  
    topTitleLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 50, top: -10, backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  
    switchCourseButton: StyleSheet.flatten([
      {top: 20, width: 150, height: 40, end: -width/3.5, backgroundColor:currentTheme.mainColor}, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    switchCourseButtonLabel: StyleSheet.flatten([
      {backgroundColor: currentTheme.primaryColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor)
    ]),

    switchCourseButton2: StyleSheet.flatten([
      {
        top: 40,
        left: 15,
        width: 150, 
        height: 40, 
        alignSelf: 'cetner',
        backgroundColor:currentTheme.primaryColor}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    switchCourseButtonLabel2: StyleSheet.flatten([
      {backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    subtitle: StyleSheet.flatten([
      {alignSelf: 'center', top: 20},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor)
    ]),

    casualButton: StyleSheet.flatten([
      {width: 240, backgroundColor:currentTheme.mainColor, alignSelf: 'center'}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),

    casualButtonLabel: StyleSheet.flatten([
      {backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    courseLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    bluetoothCenter: {
      resizeMode: 'contain',
      width: 100,
      height: 100,
      alignSelf: 'center',
      top: 60
    },

    bluetoothInner: {
      resizeMode: 'contain',
      width: 120,
      height: 120,
      alignSelf: 'center',
      top: -50
    },

    bluetoothOuter: {
      resizeMode: 'contain',
      width: 170,
      height: 170,
      alignSelf: 'center',
      top: -195
    },

  }));
}
