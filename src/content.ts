import type { IConfigContent } from "./types"

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
    const content = `import { StyleSheet, Text, View, Pressable, PressableProps, TextProps, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
    import React from 'react'

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
        return <Text { ...props } > { props.children } </Text>
    }

    export function ButtonSpinner(props: IActivityIndicator) {
        return <ActivityIndicator { ...props } />
}


    export function ButtonIcon(props: IButtonIcon) {
        return
    }

    export function Button(props: IButtonProps) {
        return (
            <Pressable { ...props } >
            { props.children }
            </Pressable>
        )
    }


    const styles = StyleSheet.create({})
`


    return content
}



export function configTheme(isExpo:boolean, fontPath:string) {
    return `
export const meterConfig = {
    colors:{
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
    },
    ${isExpo ?  `fonts: {
        // put heare your all fonts like this
        SpaceMonoRegular: require('${fontPath}/SpaceMono-Regular.ttf'), // please replase corect path : this is just example
    },` : ""}
    
    fontFamily:{
        // also add all file name like this way
        SPACEMONO_REGULAR:'SpaceMonoRegular',
    },
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

export function reactNativeConfigContent (path:string) {
  return `module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ["${path}"],
};`
}