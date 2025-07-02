
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
  