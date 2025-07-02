
  /* eslint-disable react-hooks/exhaustive-deps */
  import { useEffect, useMemo } from "react";
  import { Canvas, Group, Text, useFont } from "@shopify/react-native-skia";
  import { useSharedValue, withTiming } from "react-native-reanimated";
  import { PieSlice } from "./pie-slice";
  import { PieChartProps } from "./types";

  /**
   * PieChartIndex Component
   * 
   * Renders a pie chart using Skia and React Native Reanimated.
   * 
   * ⚙️ Setup Required:
   * - Install and configure `@shopify/react-native-skia`
   * - Install and configure `react-native-reanimated`
   * 
   * @component
   * 
   * @example
   * <PieChartIndex
   *   data={[
   *     { value: 100, color: "#d61212", label: "label-01" },
   *     { value: 200, color: "#d69112", label: "label-02" },
   *     { value: 200, color: "#1246d6", label: "label-03" }
   *   ]}
   *   textTitle="Hello World"
   *   textValue="$11431"
   *   SIZE={200}
   *   BASE_STROKE_WIDTH={25}
   * />
   */
  export default function PieChartIndex(props: PieChartProps) {
    const {
      data,
      textTitle = "Hello World",
      textValue = "257625",
      GAP = 0,
      SIZE = 300,
      BASE_STROKE_WIDTH = 40
    } = props;

    const ADJUSTED_SIZE = SIZE + BASE_STROKE_WIDTH * 2;
    const CENTER = ADJUSTED_SIZE / 2;
    const RADIUS = SIZE / 2;

    const pieAnimation = useSharedValue(0);
    const selectedSlice = useSharedValue<number | null>(null);
    const fontSize = 17;
    const font1 = useFont(require("./Roboto_Condensed-Regular.ttf"), fontSize);
    const font2 = useFont(require("./Roboto-Bold.ttf"), fontSize);

    useEffect(() => {
      pieAnimation.value = 0;
      pieAnimation.value = withTiming(1, { duration: 800 });
    }, [data]);

    const totalValue = useMemo(() => (
      data.reduce((sum, item) => sum + item.value, 0)
    ), [data]);

    const pieChartSlices = useMemo(() => {
      let currentAngle = -90;
      return data.map((item, index) => {
        const proportion = item.value / totalValue;
        const fullSweepAngle = proportion * 360;
        const segmentStart = currentAngle;
        currentAngle += fullSweepAngle;

        return {
          startAngle: segmentStart,
          fullSweepAngle,
          item,
          index,
          radius: RADIUS,
          center: CENTER,
          gap: GAP,
          strokeWidth: BASE_STROKE_WIDTH,
        };
      });
    }, [data]);

    return (
      <Canvas style={{ width: ADJUSTED_SIZE, height: ADJUSTED_SIZE }}>
        <Group>
          <Text
            x={CENTER}
            y={CENTER - 10}
            text={textTitle}
            font={font1}
            textAlign="center"
            textBaseline="middle"
          />
          <Text
            x={CENTER}
            y={CENTER + 10}
            text={textValue}
            font={font2}
            textAlign="center"
            textBaseline="middle"
          />
          {pieChartSlices.map((slice, index) => (
            <PieSlice
              key={index}
              {...slice}
              index={index}
              animatedValue={pieAnimation}
              selectedSlice={selectedSlice}
            />
          ))}
        </Group>
      </Canvas>
    );
  }
  