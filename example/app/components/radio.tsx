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
