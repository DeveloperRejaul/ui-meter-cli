  
import React from "react";
import { View, ViewProps } from "react-native";

export interface IBox extends ViewProps {
    className?: string
}

export function Box(props: IBox) {
    return <View {...props} />
}
  
