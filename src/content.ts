import type { IConfigContent } from "./types";
import fs from 'fs/promises';
import path from 'path'

export const configContent = (params: IConfigContent) => {
  const config = {
    "schema": "https://github.com/DeveloperRejaul/ui-meter",
    "path": {
      "components": params.components_path,
      "utils": params.utils_path,
      'hook': params.hook_path,
    }
  }
  return JSON.stringify(config)
}

export const buttonContent = () => {
  const content = `  
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
`


  return content
}

export async function configTheme(isExpo: boolean, fontPath: string) {

  const fontName = await fs.readdir(path.join(process.cwd(), fontPath));
  const fonts: { [key: string]: string } = {};
  const fontFamily: { [key: string]: string } = {};

  fontName.forEach((name) => {
    const key = name.split('.')[0].replace('-', '');
    fonts[key] = `require('${fontPath}/${name}')`;
    fontFamily[key.toUpperCase()] = key;
  });

  return `
export const meterConfig = {
    colors: {
    dark: {
      primary: '#1E88E5',
      secondary: '#8E24AA',
      positive: '#43A047',
      negative: '#D32F2F',
      error: '#E53935',
      warning: '#FB8C00',
    },
    light: {
      primary: '#2196F3',
      secondary: '#AB47BC',
      positive: '#66BB6A',
      negative: '#E57373',
      error: '#EF5350',
      warning: '#FFA726',
    },
  },
   fonts:{
        ${Object.keys(fonts)
      .map((key) => `'${key}': ${fonts[key]}`)
      .join(',\n')}
    },
    fontFamily:${JSON.stringify(fontFamily)},
    spacing:{
        '8xl': '96rem',
        '9xl': '128rem',
    },
    borderRadius:{
     '4xl': '2rem',
    },
}
    `
}

export function reactNativeConfigContent(path: string) {
  return `module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ["${path}"],
};`
}

export function eslintConfigContent() {
  return `
{
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
        "import/no-unresolved": 0,
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".ts",
                    ".tsx"
                ]
            }
        ],
        "no-use-before-define": "off",
        "import/extensions": [
            "error",
            "never"
        ],
        "react/prop-types": 0,
        "no-shadow": "off",
        "max-len": "off",
        "react/react-in-jsx-scope": "off",
        "object-curly-newline": "off",
        "react/no-unused-prop-types":1
    }
}
    
    `
}

export function vscodeJsonContent() {
  return `
   {
    "files.autoSave": "onFocusChange",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.formatOnSave": true
    },
    "[javascriptreact]": {
        "editor.formatOnSave": true
    },
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.formatOnSave": true,
    "cSpell.words": [
        "actualy"
    ]
}
    
    `
}

export function cardCarousalContent() {
  return `
import { FlatList, Image, View, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface IData {
    id?: string;
    imgUrl: string
}

interface ICardCarousal {
    data: IData[];
    loop?:boolean;
    duration?:number;
    play?: boolean;
    onStart?:(value: boolean)=>void;
    onEnd?:(value: boolean)=> void;
    onChange?:(index: number) => void;
    height?: number;
    width?: number;
    nextBtn?: React.ReactNode;
    prevuesBtn?: React.ReactNode
    dotActiveColor?: string;
    dotInactiveColor?:string;
    containerStyle?:ViewStyle
    dotStyle?: ViewStyle
    dotActiveStyle?:ViewStyle,
    dotInactiveStyle?:ViewStyle,
}

let interval : NodeJS.Timeout;
export default forwardRef((props: ICardCarousal, ref) => {
  const { width: WIDTH } = useWindowDimensions();
  const {
    data = [],
    loop = true,
    play = true,
    height = 200,
    width = WIDTH,
    onEnd,
    onStart,
    duration = 2000,
    onChange,
    nextBtn,
    prevuesBtn,
    dotActiveColor = 'green',
    dotInactiveColor = 'red',
    containerStyle,
    dotStyle,
    dotActiveStyle,
    dotInactiveStyle,
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [start, setStart] = useState(play);
  const slider = useRef<FlatList>(null);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      if (slider.current) {
        slider.current.scrollToIndex({ index, animated: true });
      }
    },
    next: () => {
      if (slider.current) {
        if (activeIndex === data.length - 1) {
          slider.current.scrollToIndex({ index: 0, animated: true });
        } else {
          slider.current.scrollToIndex({ index: activeIndex + 1, animated: true });
        }
      }
    },
    prevues: () => {
      if (slider.current) {
        if (activeIndex === 0) {
          slider.current.scrollToIndex({ index: data.length - 1, animated: true });
        } else {
          slider.current.scrollToIndex({ index: activeIndex - 1, animated: true });
        }
      }
    },
  }));

  useEffect(() => {
    if (play) {
      setStart(true);
    } else {
      setStart(false);
    }
  }, [play]);

  // off on control slider
  useEffect(() => {
    if (loop && start && data.length > 0) {
      interval = setInterval(() => {
        if (slider.current && activeIndex === data.length - 1) {
          onEnd?.(true);
          onChange?.(0);
          slider.current.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else if (slider.current) {
          if (activeIndex === 0) onStart?.(true);
          onChange?.(activeIndex + 1);
          slider.current.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, duration);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  });

  // for scrollToIndex
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemLayout = (_data:any, index:number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.ceil(Number(scrollPosition / width));
    setActiveIndex(currentIndex);
  };

  //  dot indicator view
  const dotIndicator = () => data.map((_e, i) => <View key={Math.random()} style={[{ height: 10, width: 10, borderRadius: 100, backgroundColor: activeIndex === i ? dotActiveColor : dotInactiveColor, ...dotStyle }, activeIndex === i ? dotActiveStyle : dotInactiveStyle]} />);

  // handle key
  const keyExtractor = (item:IData, index:number) => item?.id || index.toString();

  const renderItem = ({ index, item }:{index:number, item:IData}) => (
    <Image key={index} style={{ width, height }} source={{ uri: item.imgUrl }} />
  );

  return (
    <View style={{ borderRadius: 10, overflow: 'hidden', ...containerStyle }}>
      <FlatList
        ref={slider}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      {nextBtn}
      {prevuesBtn}
      <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 10, position: 'absolute', left: 0, right: 0, bottom: 10 }}>{dotIndicator()}</View>
    </View>
  );
});
   
    `
}

export function radioContent() {
  return `
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';
import { Pressable, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

export interface IRadioProps {
    size?: number;
    inActiveColor?: string;
    activeColor?: string;
    inValidColor?: string;
    label?: string;
    isInvalid?: boolean;
    isDisabled?: boolean;
    onChange?: (value: string) => void;
    value: string;
    borderStyle?: ViewStyle
    borderActiveStyle?: ViewStyle
    borderInactiveStyle?: ViewStyle
    ballStyle?: ViewStyle
    ballActiveStyle?: ViewStyle
    ballInactiveStyle?: ViewStyle
    containerStyle?: ViewStyle
    containerActiveStyle?: ViewStyle
    containerInactiveStyle?: ViewStyle
    labelStyle?: TextStyle
    labelActiveStyle?: TextStyle
    labelInactiveStyle?: TextStyle
    text?: string;
    gap?: number
    textStyle?: TextStyle
    textActiveStyle?: TextStyle
    textInactiveStyle?: TextStyle
}
export interface IContextRadioGroup {
    setActiveValue: React.Dispatch<React.SetStateAction<string>>;
    activeValue: string
    onChange?: (value: string) => void;
}

export interface IRadioGroup extends ViewProps {
    onChange?: (value: string) => void;
    children: React.ReactNode;
    defaultActive?: string;
}

export const Context = createContext<IContextRadioGroup>({} as IContextRadioGroup);

export function RadioGroup(props: IRadioGroup) {
    const [activeValue, setActiveValue] = useState(props.defaultActive ? props.defaultActive : '');
    const { onChange, children } = props || {};
    return (
        <Context.Provider value={{ activeValue, setActiveValue, onChange }}>
            <View style={{ flexDirection: 'row' }} {...props}>
                {children}
            </View>
        </Context.Provider>
    );
}


export function Radio(props: IRadioProps) {

    const color = {
        primary: '#1E88E5',
        dark: '#000000',
        active: '#43A047'
    }

    const {
        size = 25,
        inActiveColor = color.dark,
        activeColor = color.active,
        inValidColor = color.primary,
        borderStyle,
        ballStyle,
        ballActiveStyle,
        ballInactiveStyle,
        borderActiveStyle,
        borderInactiveStyle,
        containerStyle,
        containerActiveStyle,
        containerInactiveStyle,
        labelStyle,
        labelActiveStyle,
        labelInactiveStyle,
        value,
        isDisabled,
        isInvalid,
        label,
        onChange: radioOnChange,
        text,
        gap = 0.6,
        textActiveStyle,
        textInactiveStyle,
        textStyle,
    } = props;

    const { activeValue, setActiveValue, onChange } = useContext(Context);

    const BOX_SIZE = size * gap;
    const BOX_RADIUS = BOX_SIZE / 2;
    const CONTAINER_RADIUS = size * 0.5;
    const BORDER_WIDTH = size * 0.1;
    const DISABLE_OPACITY = 0.5;
    const isActive = activeValue === value;

    return (
        <View
            style={[{
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 20,
                opacity: isDisabled ? DISABLE_OPACITY : 1,
                ...containerStyle,
            }, isActive ? containerActiveStyle : containerInactiveStyle]}
        >
            <Pressable
                onPress={isDisabled
                    ? () => { }
                    : () => {
                        setActiveValue(value);
                        onChange?.(value);
                        radioOnChange?.(value);
                    }}
                style={[{
                    borderWidth: BORDER_WIDTH,
                    // eslint-disable-next-line no-nested-ternary
                    borderColor: isInvalid ? inValidColor : isActive ? activeColor : inActiveColor,
                    width: size,
                    height: size,
                    borderRadius: CONTAINER_RADIUS,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...borderStyle,
                }, isActive ? borderActiveStyle : borderInactiveStyle]}
            >
                <View
                    style={[{
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                        borderRadius: BOX_RADIUS,
                        backgroundColor: isActive ? activeColor : 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...ballStyle,
                    }, isActive ? ballActiveStyle : ballInactiveStyle]}
                >
                    {text && (
                        <Text
                            style={[{
                                fontSize: 10,
                                color: color.dark,
                                fontWeight: '800',
                                ...textStyle,
                            }, isActive ? textActiveStyle : textInactiveStyle]}
                        >
                            {text}
                        </Text>
                    )}
                </View>
            </Pressable>
            {label && (
                <Text style={[{ fontWeight: 'bold', fontSize: 15, color: color.dark, ...labelStyle }, isActive ? labelActiveStyle : labelInactiveStyle]}>
                    {label}
                </Text>
            )}
        </View>
    );
}  
  `
}

export function colorReduceOpacity() {
  return `
  export function reduceColorOpacity(hex: string, opacityPercent: number) {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
        let trimmedHex = hex.replace('#', '');
        if (trimmedHex.length === 3) {
            trimmedHex = trimmedHex.split('').map((hexChar) => hexChar + hexChar).join('');
        }
        const bigint = parseInt(trimmedHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    // Convert opacity percent (0-100) to a range between 0 and 1
    const opacity = Math.min(Math.max(opacityPercent, 0), 100) / 100;

    const { r, g, b } = hexToRgb(hex);

    // Return as RGBA string
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}
  `
}

export function random() {
  return `
export const randomId = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    id += charset[randomIndex];
  }
  return id;
};
  `
}