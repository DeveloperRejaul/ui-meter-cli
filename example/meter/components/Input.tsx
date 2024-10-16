
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import React from 'react';

interface IInputProps extends TextInputProps{
    leftIcon?: React.JSX.Element
    rightIcon?: React.JSX.Element
    containerStyle?:ViewStyle
}

export default function Input(props : IInputProps) {
  const {
    leftIcon,
    rightIcon,
    containerStyle,
    style,
  } = props;
  return (
    <View style={[{
      borderWidth: 1,
      flexDirection: 'row',
      borderRadius: 7,
    }, containerStyle]}
    >
      {leftIcon && leftIcon}
      <TextInput
        {...props}
        style={[{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          fontSize: 16,
        }, style]}
      />
      {rightIcon && rightIcon}
    </View>
  );
}
  
  