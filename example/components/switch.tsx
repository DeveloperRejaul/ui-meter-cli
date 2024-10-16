/* eslint-disable react/require-default-props */
import { Pressable, Animated, ViewStyle } from 'react-native';
import React, { useRef } from 'react';

export interface ISwitchProps {
    size?: number;
    onChange?:(value: boolean)=> void;
    borderStyle?:ViewStyle;
    borderActiveStyle?:ViewStyle;
    borderInActiveStyle?:ViewStyle;
    ballStyle?:ViewStyle
    ballActiveStyle?:ViewStyle
    ballInActiveStyle?:ViewStyle,
    switchMoveDuration?:number
    ballColor?:string
    ballActiveColor?:string
    ballInActiveColor?:string
    borderColor?:string;
    borderActiveColor?:string;
    borderInActiveColor?:string;
}

export default function Switch(props: ISwitchProps) {
  let isActive = false;
  const {
    size = 50,
    onChange = () => {},
    ballActiveStyle,
    ballInActiveStyle,
    ballStyle,
    borderActiveStyle,
    borderInActiveStyle,
    borderStyle,
    switchMoveDuration = 200,
    ballActiveColor,
    ballColor = 'red',
    ballInActiveColor,
    borderActiveColor,
    borderColor = 'red',
    borderInActiveColor,
  } = props;

  const WIDTH = size;
  const HEIGHT = size * 0.6;
  const BALL_WIDTH = WIDTH * 0.6;
  const MOVE = WIDTH - BALL_WIDTH;
  const position = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isActive) {
      Animated.timing(position, {
        duration: switchMoveDuration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
      isActive = false;
      onChange(false);
      return;
    }
    Animated.timing(position, {
      duration: switchMoveDuration,
      toValue: MOVE,
      useNativeDriver: false,
    }).start();
    isActive = true;
    onChange(true);
  };

  return (
    <Pressable
      style={[{
        borderWidth: 1,
        width: WIDTH,
        height: HEIGHT,
        borderRadius: WIDTH / 2,
        borderColor: isActive ? borderActiveColor || borderColor : borderInActiveColor || borderColor,
        overflow: 'hidden',
        ...borderStyle,
      }, isActive ? borderActiveStyle : borderInActiveStyle]}
      onPress={handlePress}
    >
      <Animated.View
        style={[{
          height: '100%',
          width: BALL_WIDTH,
          backgroundColor: isActive ? ballActiveColor || ballColor : ballInActiveColor || ballColor,
          borderRadius: HEIGHT / 2,
          position: 'absolute',
          left: position,
          ...ballStyle,
        }, isActive ? ballActiveStyle : ballInActiveStyle]}
      />
    </Pressable>
  );
}
