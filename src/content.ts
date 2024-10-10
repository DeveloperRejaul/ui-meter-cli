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



export async function configTheme(isExpo: boolean, fontPath: string) {


    const fontName = await fs.readdir(path.join(process.cwd(), fontPath))
    const fonts: { [keyof: string]: string } = {};
    const fontFamily: { [keyof: string]: string } = {};

    fontName.forEach((name, index) => {
        const key = name.split('.')[0].replace('-', "")
        fonts[key] = `require(${fontPath}/${name})`
        fontFamily[key.toUpperCase()] = key
    });



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
    fonts:${{ ...fonts }},
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