/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Pressable, Text, TextStyle, ViewProps, ViewStyle } from 'react-native';

interface ICheckBox extends ViewProps {
    onChange?: (value: boolean) => void;
    defaultIsChecked?: boolean;
    isDisabled?: boolean
    borderColor?: string
    size?: number
    checkIcon?: React.JSX.Element
    boxStyle?: ViewStyle
    checkStyle?: TextStyle
    boxStyleClassName?: string;
    checkStyleClassName?: string;
}

export function CheckBox(props: ICheckBox) {
  const {
    defaultIsChecked = false,
    isDisabled = false,
    borderColor = 'black',
    size = 20,
    checkIcon,
    checkStyle,
    boxStyle,
    boxStyleClassName,
    checkStyleClassName,
    onChange,
  } = props;

  const [select, setSelect] = useState<boolean>(defaultIsChecked);

  return (
    <Pressable
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={{
        borderWidth: 1,
        borderColor,
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        opacity: isDisabled ? 0.5 : 1,
        ...boxStyle,
      }}
      onPress={() => setSelect((pre) => {
        onChange?.(!pre);
        return !pre;
      })}
      {...{ className: boxStyleClassName }}
    >
      {select ? checkIcon || <Text style={checkStyle} {...{ className: checkStyleClassName }}>✓</Text> : <></>}
    </Pressable>
  );
}
