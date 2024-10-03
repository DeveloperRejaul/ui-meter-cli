import { StyleSheet, Text, View, Pressable, PressableProps, TextProps, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button>
                {/* <ButtonText>Hello</ButtonText> */}
                <ButtonSpinner />
            </Button>
        </View>
    )
}


interface IButtonProps extends PressableProps, React.RefAttributes<View> {
    className?: string;
    isLoading?: boolean;
    variant?: 'outline' | 'solid' | 'link',
    size?: number | 'xs' | 'sm' | 'md' | 'lg';
    action?: "primary" | "secondary" | "negative",
    isHovered?: boolean;
    isPressed?: boolean;
    isFocused?: boolean;
    isDisabled?: boolean;
}

interface IButtonText extends TextProps {
    className?: string;
}

interface IActivityIndicator extends ActivityIndicatorProps {
    className?: string;
}

interface IButtonIcon {
    as: React.JSX.Element;
}


export function ButtonText(props: IButtonText) {
    return <Text {...props}>{props.children}</Text>
}

export function ButtonSpinner(props: IActivityIndicator) {
    return <ActivityIndicator {...props} />
}


export function ButtonIcon(props: IButtonIcon) {
    return
}

export function Button(props: IButtonProps) {
    return (
        <Pressable {...props}>
            {props.children}
        </Pressable>
    )
}


const styles = StyleSheet.create({})