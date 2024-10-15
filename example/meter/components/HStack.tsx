
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
  
  