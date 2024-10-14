  
import { Pressable, Text, ViewStyle, StyleSheet, TextStyle, PressableProps } from 'react-native';

export interface IButton extends PressableProps {
    text?:string
    leftIcon?: React.JSX.Element
    rightIcon?: React.JSX.Element
    containerStyle?: ViewStyle;
    textStyle?: TextStyle
    variant?: 'solid' | 'outline' | 'link'
    action?:'primary' | 'secondary' | 'positive' | 'negative'
    isDisabled?:boolean;
}

export default function Button(props : IButton) {
  const {
    text = 'Hello World!',
    containerStyle,
    leftIcon,
    rightIcon,
    textStyle,
    variant = 'solid',
    action = 'primary',
    isDisabled,
  } = props;

  const color = {
    primary: '#1E88E5',
    secondary: '#8E24AA',
    positive: '#43A047',
    negative: '#D32F2F',
  };

  const style = {
    solid: {
      backgroundColor: color[action],
    },
    outline: {
      borderWidth: 1,
      borderColor: color[action],
    },
    link: {},
  };

  return (
    <Pressable
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[styles.container, { opacity: isDisabled ? 0.5 : 1 }, style[variant], containerStyle]}
      {...props}
    >
      {leftIcon}
      <Text style={[styles.text, textStyle, variant === 'link' && { textDecorationLine: 'underline' }]}>{text}</Text>
      {rightIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});
