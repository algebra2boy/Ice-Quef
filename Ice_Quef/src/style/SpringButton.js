import React from 'react';
import { Animated } from 'react-native';
import { Pressable, Text } from 'react-native';

//https://www.youtube.com/watch?v=BzqHru-sIXw
var isPressing = false;
/**
 * Resembles an animated button
 *
 * @param { string } text: The text label for button
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

    animatedScale.setValue(0.95);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 2,
      speed: 0.2,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonRelease = () => {
    if (isPressing)
      return;
    isPressing = true;
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start(() => {
      onPress(); // Callback after the animation completes
      isPressing = false;
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <Pressable style={buttonStyle} onPressIn={handleButtonPress} onPressOut={handleButtonRelease}>
        <Text style={labelStyle}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};
