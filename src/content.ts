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


export function NavRef () {
  return `
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

// add you all screen name  
// or you can make type from screen names object: export type RouteType =  typeof screens[keyof typeof screens]
export type RouteType =  "screen1" | "screen1"

export const navigationRef = createNavigationContainerRef();

export class nav {
  static push(name: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  static reset(routeName: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.reset({index: 0, routes: [{name: routeName, params}]});
    }
  }

  static pop() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.pop());
    }
  }

  static navigate<T>(name: RouteType, params?: T) {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  }

  static back() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  static replace(name: RouteType, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
}
  `
}

export function box() {
  return `  
import React from "react";
import { View, ViewProps } from "react-native";

export interface IBox extends ViewProps {
    className?: string
}

export function Box(props: IBox) {
    return <View {...props} />
}
  
`
}

export function center() {
  return `
import { ViewProps, View } from "react-native";

interface ICenter extends ViewProps {
    className?: string
}

export function Center(props: ICenter) {
    return <View {...props} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, props.style]} />
}
  `
}



export function divider() {
  return `
import { View, ViewProps } from "react-native";

export interface IDivider extends ViewProps {
    className?: string;
    orientation?: "horizontal" | "vertical"
    backgroundColor?: string;
    m?: number
}

export default function Divider(props: IDivider) {
    const {
        orientation = "vertical",
        backgroundColor = "#000",
        m,
    } = props;

    const vm = orientation === "vertical" ? m : 0;
    const hm = orientation === "horizontal" ? m : 0
    const h = orientation === "horizontal" ? "100%" : 1;
    const w = orientation === "vertical" ? null : 1;

    return (
        <View
            {...props}
            style={[{
                height: h,
                width: w,
                backgroundColor,
                marginVertical: vm,
                marginHorizontal: hm,
            }, props.style]}
        />
    );
}
  
  `
}


export function alert () {
  return `
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, runOnJS, runOnUI, setNativeProps, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import { colors } from '../constance/colors';
import { rcp } from '../utils/color';


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
interface IShowData {
  message: string;
}

interface IAnimatedAlert {
  show: (data: IShowData, cb?: (value: 'cancel' | 'ok') => void) => void
}

export const animatedAlert: IAnimatedAlert = {
  // @ts-ignore
  show: (data: IShowData, cb: (value: string) => void) => { },
};
// @ts-ignore
let callBack: (value: string) => void | null = null;

export default function AnimatedAlert() {
  const { height, width } = useWindowDimensions();
  const textRef = useAnimatedRef();
  const animatedValue = useSharedValue(0);

  useLayoutEffect(() => {
    // @ts-ignore
    animatedAlert.show = show;
  }, []);

  const hide = (value: string) => {
    if (callBack) runOnJS(callBack)(value);
    animatedValue.value = withTiming(0, { duration: 500 });
  };

  const show = (data: IShowData, cb: (value: string) => void) => {
    callBack = cb;
    runOnUI(() => {
      if (Platform.OS === 'web') {
        // @ts-ignore
        textRef.current.value = data.message;
        return;
      }
      setNativeProps(textRef, { text: data.message });
    })();
    animatedValue.value = withTiming(1, { duration: 300 });
  };
  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedValue.value, [1, 0.5], [1, 0], 'clamp'),
    transform: [{ translateX: interpolate(animatedValue.value, [0.5, 0], [0, width], 'clamp') }],
    display: animatedValue.value === 0 ? 'none' : 'flex',
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(animatedValue.value, [1, 0.5], [1, 0.9], 'clamp'),
      },
      {
        translateY: interpolate(animatedValue.value, [1, 0.5], [0, 50], 'clamp'),
      },
    ],
    opacity: interpolate(animatedValue.value, [1, 0], [1, 0], 'clamp'),
    display: animatedValue.value === 0 ? 'none' : 'flex',
  }));

  return (
    <Animated.View style={[styles.body, { height, width }, animatedContainerStyle]}>
      <Animated.View style={[styles.container, { width:  (width * 0.8), height: 270 }, animatedStyle]}>
        <View style={styles.alertHeader}>
          <Text style={styles.title}>Alert Action </Text>
          <TouchableOpacity
            onPress={() => hide('close')}
            style={styles.close}
          >
            <Icon name="close" color={colors.dark} size={20} />
          </TouchableOpacity>
        </View>
        <AnimatedTextInput
          ref={textRef}
          style={styles.message}
          editable={false}
          multiline
        />
        <View style={styles.btnContainer}>
          <Button
            text="Cancel"
            containerStyle={{ backgroundColor: colors.button }}
            textStyle={{ color: colors.weight }}
            onPress={() => hide('cancel')}
          />
          <Button
            text="Ok"
            containerStyle={{ backgroundColor: colors.error }}
            textStyle={{ color: colors.weight}}
            onPress={() => hide('ok')}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.weight,
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    rowGap: 10,
    justifyContent: 'space-between',
  },

  body: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rcp(colors.dark, 30),
  },
  message: {
    color: colors.dark,
    fontSize: 16,
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
  },
  close: {
    backgroundColor: rcp(colors.button, 60),
    borderRadius: 20,
    padding: 5,
    top: -10,
    right: -10,
  },
  btnContainer: { flexDirection: 'row', alignSelf: 'flex-end', columnGap: 20 },
  alertHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
  
  `
}


export function toast () {
  return `
  import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constance/colors';
import { rcp } from '../utils/color';

interface IShowData {
  title?: string,
  message: string
  hideDuration?: number,
  bgColor?: string
  titleColor?: string
  messageColor?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

interface IAnimatedToast {
  show: (data: IShowData, cb?: () => void) => void
}

export const animatedToast: IAnimatedToast = {
  show: () => { },
};

export default function AnimatedToast() {
  const { width: WIDTH } = useWindowDimensions();
  const TOAST_WIDTH = 350;
  const OFFSET = WIDTH - TOAST_WIDTH;
  const ANIMATED_VISIBLE_VALUE = 50;
  const ANIMATED_HIDE_VALUE = -100;
  const top = useSharedValue(ANIMATED_HIDE_VALUE);
  const [tostData, setTostData] = useState<IShowData>({} as IShowData);

  useEffect(() => {
    animatedToast.show = function show(data: IShowData, cb?: () => void) {
      setTostData(data);
      top.value = withSpring(ANIMATED_VISIBLE_VALUE, {}, () => {
        top.value = withDelay(data.hideDuration || 1000, withSpring(ANIMATED_HIDE_VALUE, {}, () => {
          if (cb) runOnJS(cb)?.();
        }));
      });
    };
  }, []);

  const hide = () => {
    top.value = withSpring(ANIMATED_HIDE_VALUE);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    display: top.get() === ANIMATED_HIDE_VALUE ? 'none' : 'flex',
  }));

  const getBg = (type:IShowData['type']) => {
    switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    case 'info':
      return colors.error;
    case 'warning':
      return colors.error;
    default:
      return colors.success;
    }
  };

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          top,
          width: TOAST_WIDTH,
          left: OFFSET / 2,
          right: OFFSET / 2,
          backgroundColor: getBg(tostData.type),
        }, animatedStyle]}
    >
      <TouchableOpacity
        onPress={hide}
        style={styles.close}
      >
        <Icon name="close" color={colors.dark} size={20} />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: tostData?.titleColor || colors.dark }}> {tostData?.title || 'Action Message'}</Text>
      <Text style={{ ...styles.message, color: tostData?.messageColor || colors.dark }}> {tostData.message || ''}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
  },
  message: {
    fontSize: 14,
    padding: 0,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: rcp(colors.active, 10),
    borderRadius: 20,
    padding: 5,
  },
});
  
  
  `
}

export function HStackContent() {
  return `
import { View, ViewProps } from "react-native";

export interface IHStack extends ViewProps {
    space?: number;
    reversed?: boolean;
    className?: string
}


export function HStack(props: IHStack) {
    const {
        reversed = false,
        space = 5,
    } = props;
    return <View {...props} style={[{ flexDirection: reversed ? "row-reverse" : "row", columnGap: space }, props.style]} />
}
  
  `
}

export function VStackContent() {
  return `
import { View, ViewProps } from "react-native";

interface IVStack extends ViewProps {
    className?: string;
    space?: number;
    reversed?: boolean;
}

export function VStack(props: IVStack) {
    const {
        space = 5,
        reversed = false
    } = props;
    return <View  {...props} style={[{ flexDirection: reversed ? "column-reverse" : "column", rowGap: space }, props.style]} />
}
  
  `
}

export function checkBoxContent() {

  return `
import React, { useState } from 'react';
import { Pressable, Text, TextStyle, ViewProps, ViewStyle } from 'react-native';

interface ICheckBox extends ViewProps {
    onChange?: (value: string | number) => void;
    defaultIsChecked?: boolean;
    isDisabled?: boolean
    borderColor?: string
    size?: number
    checkIcon?: React.JSX.Element
    boxStyle?: ViewStyle
    boxActiveStyle?: ViewStyle
    boxInactiveStyle?: ViewStyle
    checkStyle?: TextStyle
    checkActiveStyle?: TextStyle
    checkInactiveStyle?: TextStyle
    boxStyleClassName?: string;
    checkStyleClassName?: string;
    value: string | number
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
    boxActiveStyle,
    boxInactiveStyle,
    boxStyleClassName,
    checkStyleClassName,
    checkActiveStyle,
    checkInactiveStyle,
    onChange,
    value,
  } = props;

  const [select, setSelect] = useState<boolean>(defaultIsChecked);

  return (
    <Pressable
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[{
        borderWidth: 1,
        borderColor,
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        opacity: isDisabled ? 0.5 : 1,
        ...boxStyle,
      }, select ? boxActiveStyle : boxInactiveStyle]}
      onPress={() => setSelect((pre) => {
        onChange?.(value);
        return !pre;
      })}
      {...{ className: boxStyleClassName }}
    >
      {select ? checkIcon || <Text style={[checkStyle, select ? checkActiveStyle : checkInactiveStyle]} {...{ className: checkStyleClassName }}>✓</Text> : null}
    </Pressable>
  );
}

  `
}


export function switchContent() {
  return `
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
  `
}



export function inputContent() {
  return `
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
      alignItems: 'center',
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
  `
}


export function animatedInput() {
  return `
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
      useNativeDriver: false,
      duration: 200,
    }).start();
  };

  const handleFocus = () => {
    viewRef.current?.setNativeProps({ borderWidth: 1 });
    Animated.timing(animated, {
      toValue: 1,
      useNativeDriver: false,
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
  `
}


export function bottomSheet() {
  return `  
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, useWindowDimensions, StatusBar, Pressable } from 'react-native';

interface IShowParams {
    render: React.JSX.Element,
    duration?:number;
}
interface IHideParams {
    duration?:number;
}

interface IBottomSheet {
    show: (ele: IShowParams) => void;
    hide: (ele?:IHideParams) => void;
}

export const bottomSheet:IBottomSheet = { show: () => {}, hide: () => {} };

export function BottomSheetContainer() {
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();
  const TOTAL_HEIGHT = (HEIGHT + (StatusBar?.currentHeight || 0));
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [content, setContent] = useState<React.JSX.Element>();

  useEffect(() => {
    bottomSheet.show = function (ele) {
      setContent(ele.render);
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -TOTAL_HEIGHT,
          useNativeDriver: true,
          duration: ele.duration || 100,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
          duration: ele.duration || 100,
        }),
      ]).start();
    };

    bottomSheet.hide = function (data) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: data?.duration || 100,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: data?.duration || 100,
        }),
      ]).start();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container, { height: TOTAL_HEIGHT, width: WIDTH, bottom: -TOTAL_HEIGHT, transform: [{ translateY }], zIndex: 1000 }]}
    >
      <Animated.View style={{ flex: 1, backgroundColor: '#00000062', opacity }}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => bottomSheet.hide()}
        />
      </Animated.View>
      <View style={[styles.sheet]}>
        <View style={styles.bar} />
        {content}
      </View>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  bar: {
    width: 100,
    alignSelf: 'center',
    height: 5,
    borderRadius: 50,
    backgroundColor: '#7272722c',
  },
});

  `
}



export function keyboardAvoidingScrollView () {
  return `
  /* eslint-disable react-hooks/exhaustive-deps */
import { Keyboard,  ScrollViewProps, ScrollView, TextInput, useWindowDimensions} from 'react-native';
import React, { useEffect, useRef } from 'react';

interface IKeyboardAvoidingViewProps  extends ScrollViewProps{
    children: React.ReactNode;
    refs:  React.RefObject<TextInput>[]
    inputPadding?:number
}

/*
* @example
* // Example usage of KeyboardAvoidingScrollView
* export default function Example() {
*   const refs = Array.from({length: 20}, () => createRef<TextInput>());
*   return (
*     <KeyboardAvoidingScrollView
*       inputPadding={15}
*       refs={refs}
*       contentContainerStyle={{paddingBottom: 280}}
*     >
*       {refs.map((ele, index) => (
*         <TextInput key={index} ref={ele} style={{borderWidth: 1, padding: 10}} placeholder={index} />
*       ))}
*     </KeyboardAvoidingScrollView>
*   );
* }
*/

export default function KeyboardAvoidingScrollView(props : IKeyboardAvoidingViewProps) {
  const {children, refs,inputPadding = 0, ...extra} = props;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {height: HEIGHT} = useWindowDimensions();


  useEffect(()=>{
    Keyboard.addListener('keyboardDidShow', (params) => {
      for (const inputRef of refs) {
        if(inputRef.current?.isFocused()) {
          inputRef.current?.measure((...pr) =>{
            const inputY = pr[5];
            const keyboardHeight = params.endCoordinates.height;
            const offset = HEIGHT - keyboardHeight;
            if(inputY > offset) {
              const scrollHeight = (inputY - offset) + inputPadding;
              scrollViewRef.current?.scrollTo({y:scrollHeight});
            }
          });
        }
      }
    });
    Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({y:0});
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  },[]);

  return (
    <ScrollView ref={scrollViewRef}{...extra}>
      {children}
    </ScrollView>
  );
}
  `
}


// audio 
export function audioRecordHook() {
  return `
import { useContext, useState } from 'react';
import AudioRecord from 'react-native-audio-record';
import SoundPlayer from 'react-native-sound-player';
import { Context } from './AudionRecordProvider';
import fs from 'react-native-fs';

export default function useAudioRecorder() {
    const {startRecording, PACKAGE_ID} = useContext(Context);
    const [isPlaying, setIsPlaying] = useState(false);
    const [path, setPath] = useState<string | null>(null);

    /**
     * Stops the current audio recording and returns the file path.
     * @returns {Promise<string | undefined>} The saved audio file path or undefined on error.
     */
    const stopRecording = async () => {
        try {
            const filePath = await AudioRecord.stop();
            setPath(filePath);
            return filePath;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Plays an audio file from a given URL or from the last recorded path.
     * @param {string} [playUrl] Optional URL to play audio from.
     */
    const playRecording = (playUrl?: string) => {
        try {
            setIsPlaying(true);
            if (playUrl) {
                SoundPlayer.playUrl(playUrl);
                return;
            }

            if (path) {
                SoundPlayer.playUrl(path);
                return;
            }
            console.log('file path not found');
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Stops the audio player if currently playing.
     */
    const stopPlayer = () => {
        try {
            if (!isPlaying) {
                return;
            }
            SoundPlayer.stop();
            setIsPlaying(false);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Fetches all audio recordings from the app's document directory.
     * Filters files by PACKAGE_ID.
     * @returns {Promise<fs.ReadDirItem[] | undefined>} Array of file objects or undefined on error.
     */
    const getAllRecording = async () => {
        try {
            const files = await fs.readDir(fs.DocumentDirectoryPath);
            const recordFiles = files.filter(file => file.path.includes(PACKAGE_ID));
            console.log(recordFiles);
            return recordFiles;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Gets the most recent audio recording file.
     * @returns {Promise<fs.ReadDirItem | undefined>} Last recording file or undefined on error.
     */
    const getLastRecording = async () => {
        try {
            const files = await getAllRecording();
            if (files) {
                return files.pop();
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Deletes all audio recordings in the app's document directory.
     */
    const deleteAllRecording = async () => {
        try {
            const recordings = await getAllRecording();
            if (recordings) {
                for (const element of recordings) {
                    await fs.unlink(element.path);
                }
                console.log('All file delete success');
                return;
            }
            console.log('file not found');
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Deletes a specific recording by its file name.
     * @param {string} id The file name of the recording to delete.
     */
    const deleteRecordingById = async (id: string) => {
        try {
            await fs.unlink(\`\${fs.DocumentDirectoryPath}/\${id}\`);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isPlaying,
        stopRecording,
        startRecording,
        playRecording,
        stopPlayer,
        getAllRecording,
        getLastRecording,
        deleteAllRecording,
        deleteRecordingById,
        utils: { ...SoundPlayer, onRecording: AudioRecord.on },
    };
}
`.trim();
}


export function audionRecordProvider () {
  return `
  
  import { Component, createContext, ReactNode } from 'react';
import AudioRecord from 'react-native-audio-record';
import { check, PERMISSIONS, request } from 'react-native-permissions';

interface AudioProviderProps {
    children: ReactNode;
}

export interface IContextValuesTypes  {
    startRecording:() => Promise<void>
    PACKAGE_ID: 'recorder-salespype'
}


export const Context = createContext({} as IContextValuesTypes);
const PACKAGE_ID = 'recorder-salespype';
export default class AudioProvider extends Component<AudioProviderProps> {

    async componentDidMount(): Promise<void> {
        await this.checkPermission();
    }

    async checkPermission () {
        const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
            if(result !== 'granted') {
            await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
    }

    async startRecording() {
        try {
            const options = {
                sampleRate: 16000,
                channels: 1,
                bitsPerSample: 16,
                audioSource: 6,
                wavFile: \`\${PACKAGE_ID}-\${Date.now()}.wav\`,
              };
              AudioRecord.init(options);
            AudioRecord.start();
        } catch (error) {
            console.log(error);
        }
     }


  render() {
    return (
        <Context.Provider value={{startRecording: this.startRecording, PACKAGE_ID}}>
            {this.props.children}
        </Context.Provider>
    );
  }
}`
}


export function babelConfigContent () {
  return`module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
   // if you already have other plugin just paste this lines below
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
          '.d.ts',
        ],
        root: ['.'],
        alias: {
          '@src': './src'
        },
      },
    ],
  ],
};
`
}



// pie chart 
export function getPieChartTypes () {
  return `
import { SharedValue } from "react-native-reanimated";

export interface PieChartProps {
  data: PieChartDataEntry[];
  textTitle?:string
  textValue?:string
  GAP?:number
  SIZE?:number
  BASE_STROKE_WIDTH?:number
}

export interface PieChartDataEntry {
  value: number;
  color: string;
  label: string;
}

export interface PieSliceData {
  item: PieChartDataEntry;
  startAngle: number;
  index: number;
  radius: number;
  center: number;
  fullSweepAngle: number;
  gap: number;
  animatedValue: SharedValue<number>;
  strokeWidth: number;
  selectedSlice: SharedValue<number | null>;
}

export interface PieSliceContextTypes {
  slice: PieSliceData;
}

export interface CalculateAngleParams  {
  proportion: number;
  currentAngle: number;
  gap: number;
}

export interface ICreateArcPathParams {
  startAngle: number;
  endAngle: number;
  radius: number;
  center: number;
  strokeWidth: number;
}

export interface ICheckIfDistanceIsInsideArcParams {
  centerX: number;
  centerY: number;
  radius: number;
  strokeWidth: number;
  x: number;
  y: number;
}


export interface IIsPointInArcParams {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export interface ICalculateTouchAngle {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
}


export interface IHandlePieTouchParams <T>{
  centerX: number;
  centerY: number;
  data: T[];
  totalValue: number;
  radius: number;
  gap: number;
  x: number;
  y: number;

  onSlicePress: (index: number) => void;
  selectedSlice: SharedValue<number | null>;
} 
  `
}

export function getPieSlice () {
  return `
  import { PieSliceData } from "./types";
import { SPRING_CONFIG } from "./animation";
import { createArcPath } from "./draw";
import { Path } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

export function PieSlice(props: PieSliceData) {
  const {
    index,
    item,
    startAngle,
    fullSweepAngle,
    gap,
    animatedValue,
    radius,
    center,
    strokeWidth,
    selectedSlice,
  } = props;
  
  const animatedStrokeWidth = useDerivedValue(() => {
    if (selectedSlice.value === null) {
      return withSpring(strokeWidth, SPRING_CONFIG);
    }
    return withSpring(selectedSlice.value === index ? strokeWidth * 1.5 : strokeWidth * 0.8,SPRING_CONFIG);
  });

  const path = useDerivedValue(() => {
    const animatedSweep = Math.max(0,(fullSweepAngle - gap) * animatedValue.value);

    return createArcPath({
      startAngle: startAngle,
      endAngle: startAngle + animatedSweep,
      radius,
      center: center,
      strokeWidth: strokeWidth,
    });
  });

  return (
    <Path
      path={path}
      color={item.color}
      style="stroke"
      strokeWidth={animatedStrokeWidth}
      strokeCap="round"
    />
  );
}
  `
}



/**
 * Generates the full code of PieChartIndex component as a string.
 * 
 * @returns {string} The code of the PieChartIndex component.
 */
export function getPieChartIndexCode() {
  return `
  /* eslint-disable react-hooks/exhaustive-deps */
  import { useEffect, useMemo } from "react";
  import { Canvas, Group, Text, useFont } from "@shopify/react-native-skia";
  import { useSharedValue, withTiming } from "react-native-reanimated";
  import { PieSlice } from "./pie-slice";
  import { PieChartProps } from "./types";

  /**
   * PieChartIndex Component
   * 
   * Renders a pie chart using Skia and React Native Reanimated.
   * 
   * ⚙️ Setup Required:
   * - Install and configure \`@shopify/react-native-skia\`
   * - Install and configure \`react-native-reanimated\`
   * 
   * @component
   * 
   * @example
   * <PieChartIndex
   *   data={[
   *     { value: 100, color: "#d61212", label: "label-01" },
   *     { value: 200, color: "#d69112", label: "label-02" },
   *     { value: 200, color: "#1246d6", label: "label-03" }
   *   ]}
   *   textTitle="Hello World"
   *   textValue="$11431"
   *   SIZE={200}
   *   BASE_STROKE_WIDTH={25}
   * />
   */
export default function PieChartIndex(props: PieChartProps) {
  const {
    data,
    textTitle = "hello world",
    textValue = "257625",
    GAP = 0,
    SIZE = 300,
    BASE_STROKE_WIDTH = 40
  } = props
  const ADJUSTED_SIZE = SIZE + BASE_STROKE_WIDTH * 2
  const CENTER = ADJUSTED_SIZE / 2
  const RADIUS = SIZE / 2;

  const pieAnimation = useSharedValue(0);
  const selectedSlice = useSharedValue<number | null>(null);
  const fontSize = 17;
  const font1 = useFont(require("./Roboto_Condensed-Regular.ttf"), fontSize);
  const font2 = useFont(require("./Roboto-Bold.ttf"), fontSize);

  useEffect(() => {
    pieAnimation.value = 0;
    pieAnimation.value = withTiming(1, { duration: 800 });
  }, [data]);

  const totalValue = useMemo(() => data.reduce((sum, item) => sum + item.value, 0),[data]);
  const pieChartSlices = useMemo(() => {
    let currentAngle = -90

    return data.map((item, index) => {
      const proportion = item.value / totalValue;
      const fullSweepAngle = proportion * 360;

      const segmentStart = currentAngle;
      currentAngle += fullSweepAngle;

      return {
        startAngle: segmentStart,
        fullSweepAngle,
        item: item,
        index: index,
        radius: RADIUS,
        center: CENTER,
        gap: GAP,
        strokeWidth: BASE_STROKE_WIDTH,
      };
    });
  }, [data]);


  return (
        <Canvas style={{width: ADJUSTED_SIZE,height: ADJUSTED_SIZE}}>
          <Group>
            <Text
                x={(CENTER - 3.2) - textTitle.length * 3.2}
                y={CENTER - 10}
                text={textTitle}
                font={font1}  
            />
            <Text
                x={(CENTER - 4) - textValue.length * 4}
                y={CENTER + 10}
                text={textValue}
                font={font2}  
            />
            {pieChartSlices.map((slice, index) =><PieSlice key={index}{...{...slice,index,animatedValue: pieAnimation,selectedSlice}}/>)}
          </Group>
        </Canvas>
  );
}
  `;
}


export function getPieChartAnimations () {
  return `
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

export const SPRING_CONFIG: SpringConfig = {
  mass: 1,
  damping: 15,
  stiffness: 130,
};
  
  `
}


export function getPieChartCalculate () {
  return `
import { CalculateAngleParams } from "./types";

export const calculateAngle = (args: CalculateAngleParams) => {
  'worklet';
  const { proportion, currentAngle: _currentAngle, gap } = args;

  const sweepAngle = proportion * 360;

  const startAngle = (_currentAngle + 360) % 360; // Normalize to 0-360
  const endAngle = (startAngle + sweepAngle - gap + 360) % 360; // Normalize to 0-360
  const currentAngle = _currentAngle + sweepAngle;

  return {
    startAngle,
    endAngle,
    currentAngle,
  };
};
  
  `
}


export function getPieChartDraw () {
  return `
import { Skia } from '@shopify/react-native-skia';
import { ICreateArcPathParams } from './types';

export const createArcPath = (args: ICreateArcPathParams) => {
  'worklet';
  const { startAngle, endAngle, radius, center, strokeWidth } = args;
  const path = Skia.Path.Make();

  path.addArc(
    {
      x: center - radius + strokeWidth / 2,
      y: center - radius + strokeWidth / 2,
      width: radius * 2 - strokeWidth,
      height: radius * 2 - strokeWidth,
    },
    startAngle,
    endAngle - startAngle,
  );
  return path;
};
  `
}


export function listView () {
  return`
import React from 'react';
import type { FlatListProps ,ViewStyle} from 'react-native';
import { FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl, useWindowDimensions,View } from 'react-native';


interface IListShowProps extends Omit<FlatListProps<any>, 'data'>{
    query1:any
    query2?:any
    queryParams?:Record<string, string|number|boolean>
    selector?:(value:any)=> void
    header?:{
      isScrollable?:boolean,
      render: (item:any)=> React.JSX.Element
    }
}
interface ScreenLoadingProps  {
  style?: ViewStyle
}


let page = 0;
const limit = 10;
let isFUllScreenContent = false;

function ListShow(props: IListShowProps) {
  const {
    query1,
    query2,
    queryParams,
    selector,
    initialNumToRender,
    header,
    ...extra
  } = props;

  const {height} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);

  const {data, isLoading, isFetching, refetch} = query1({...queryParams});
  const [get, res] = query2();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    page = 0;
    refetch()
      .then(()=>{
        setRefreshing(false);
      })
      .catch(()=> {
        setRefreshing(false);
      });
  }, [refetch]);

  const handleMore = async () => {
    if (isFetching || isLoading || res.isFetching || res.isLoading || !data?.body ||  (data?.body && data.body.length < limit)) return;
    if(res.data && !((res.data.body?.length || 0) >= limit)) {
      return;
    }

    page += 1;
    get({ page, limit, ...queryParams});
  };

  const getHeader = () => {
    if (!header) return {};
    const obj:Record<string, any> = {
      ListHeaderComponent : ((isFetching || isLoading) && !refreshing ) ? <ActivityIndicator size="small" color="#000" /> : header.render(data),
    };
    if(!header.isScrollable) {
      obj.stickyHeaderIndices = [0];
    }
    return obj;
  };


  return (
    <FlatList
      onContentSizeChange={(_contentWidth: number, contentHeight: number) => {
        isFUllScreenContent = contentHeight > height;
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      data={(selector && data) ? selector(data) : (data?.body || [])}
      onEndReached={initialNumToRender ? null : (isFUllScreenContent ? handleMore : undefined)}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.container}
      ListEmptyComponent={(!data && (isLoading || isFetching)) ? <ScreenLoading style={styles.empty}/> : <Text style={styles.empty}>No data found</Text>}
      ListFooterComponent={(res.isLoading || res.isFetching) ? <ActivityIndicator size="small" color="#000" /> : null}
      {...getHeader()}
      {...extra}
    />
  );
}

export default ListShow;





function ScreenLoading(props: ScreenLoadingProps) {
  return (
    <View style={{ flex:1,justifyContent:'center', alignItems:'center', ...props.style}}>
      <ActivityIndicator size={'large'}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    paddingBottom: 100,
    padding: 12,
  },
  empty:{
    paddingTop: 20,
    textAlign:'center',
  },
});
  `
}