import React from 'react';
import { Animated } from 'react-native';
import { Pressable, Text } from 'react-native';

//https://www.youtube.com/watch?v=BzqHru-sIXw
var isPressing = false;
/**
 * Resembles an animated button
 *
 * @param { string | Text } text: The text label for button
 * @param { func } onPress: Function to be executed after animation finishes
 * @param { StyleSheet } buttonStyle: The button's style
 * @param { StyleSheet } labelStyle: The label's style
 * @returns { ReactElement } The button
 */
export const SpringButton = ({ text, onPress, buttonStyle, labelStyle }) => {
  const animatedScale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleButtonPress = () => {
    if (isPressing) return;
    animatedScale.setValue(0.95);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 2,
      speed: 0.2,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonRelease = () => {
    if (isPressing) return;

    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start(() => {
      isPressing = false;
    });
    isPressing = true;
  };

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <Pressable
        style={buttonStyle}
        onPressIn={handleButtonPress}
        onPressOut={handleButtonRelease}
        onPress={() => onPress()}
        onLongPress={() => {}}
      >
        {typeof text === 'string' && <Text style={labelStyle}>{text}</Text>}
        {typeof text === 'object' && text}
      </Pressable>
    </Animated.View>
  );
};
