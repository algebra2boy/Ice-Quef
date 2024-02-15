import React from 'react';
import { Animated } from 'react-native';
import { Pressable, Text } from 'react-native';


//https://www.youtube.com/watch?v=BzqHru-sIXw

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
      useNativeDriver: true
    }).start();
  };

  const handleButtonRelease = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start(() => {
      onPress(); // Callback after the animation completes
    });
  };

  return (
    <Animated.View style={{transform: [{scale: animatedScale}]}} >
      <Pressable 
        style={buttonStyle}
        onPressIn={handleButtonPress}
        onPressOut={handleButtonRelease}
      >
          <Text style={labelStyle}>
            {text}
          </Text>
      </Pressable>
    </Animated.View>
  );
};