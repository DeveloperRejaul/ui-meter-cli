
import { Skia } from '@shopify/react-native-skia';
import { ICreateArcPathParams } from './types';

export const createArcPath = (args: ICreateArcPathParams) => {
  'worklet';
  const { startAngle, endAngle, radius, center, strokeWidth } = args;
  const path = Skia.Path.Make();

  path.addArc(
    {
      x: center - radius + strokeWidth / 2,
      y: center - radius + strokeWidth / 2,
      width: radius * 2 - strokeWidth,
      height: radius * 2 - strokeWidth,
    },
    startAngle,
    endAngle - startAngle,
  );
  return path;
};
  