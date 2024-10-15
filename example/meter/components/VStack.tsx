
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
  
  