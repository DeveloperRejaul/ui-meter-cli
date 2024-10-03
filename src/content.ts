import type { IConfigContent } from "./types"

export const configContent = (params: IConfigContent) => {
    const config = {
        "schema": "https://github.com/DeveloperRejaul/ui-meter",
        "path": {
            "components": params.components_path,
            "utils": params.utils_path
        }
    }
    return JSON.stringify(config)
}


export const buttonContent = () => {

    const content = `
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Index() {
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

`


    return content
}
