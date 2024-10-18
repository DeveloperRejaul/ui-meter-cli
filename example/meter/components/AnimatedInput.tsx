
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextInput, TextInputProps, ViewStyle, Animated, View, Text } from 'react-native';
import React, { useRef } from 'react';

interface IInputProps extends TextInputProps{
    leftIcon?: React.JSX.Element
    rightIcon?: React.JSX.Element
    containerStyle?:ViewStyle
    inputType?: 'password' | 'text'
    label?:string
    activeBorderColor?:string;
    inActiveBorderColor?:string;
    activeBg?:string;
    inActiveBg?:string;
}

export default function AnimatedInput(props : IInputProps) {
  const {
    leftIcon,
    rightIcon,
    containerStyle,
    style,
    label,
    activeBorderColor = '#fe4487',
    inActiveBorderColor = '#0000005b',
    activeBg = 'transparent',
    inActiveBg = '#00000002',
  } = props;
  const animated = useRef(new Animated.Value(0.5)).current;
  const viewRef = useRef<View>(null);
  const handleBlur = () => {
    viewRef.current?.setNativeProps({ borderWidth: 0.8 });
    Animated.timing(animated, {
      toValue: 0.5,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const handleFocus = () => {
    viewRef.current?.setNativeProps({ borderWidth: 1 });
    Animated.timing(animated, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const animColor = animated.interpolate({
    inputRange: [0.5, 1],
    outputRange: [inActiveBorderColor, activeBorderColor],
  });

  const animBg = animated.interpolate({
    inputRange: [0.5, 1],
    outputRange: [inActiveBg, activeBg],
  });

  return (
    <View>
      {label && (
      <Text style={{
        color: '#0000008a',
        fontSize: 15,
        fontWeight: '400',
        paddingBottom: 4,
      }}
      >
        {props.label}
      </Text>
      )}
      <Animated.View
        ref={viewRef}
        style={[{
          flexDirection: 'row',
          borderRadius: 7,
          alignItems: 'center',
          paddingHorizontal: 10,
          borderWidth: 0.8,
          borderColor: animColor,
          backgroundColor: animBg,
        }, containerStyle]}
      >
        {leftIcon && leftIcon}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
          style={[{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            fontSize: 16,
          }, style]}
        />
        {rightIcon && rightIcon}
      </Animated.View>
    </View>
  );
}  
  