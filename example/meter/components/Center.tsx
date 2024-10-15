
import { ViewProps, View } from "react-native";

interface ICenter extends ViewProps {
    className?: string
}

export function Center(props: ICenter) {
    return <View {...props} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, props.style]} />
}
  