
import { SharedValue } from "react-native-reanimated";

export interface PieChartProps {
  data: PieChartDataEntry[];
  textTitle?:string
  textValue?:string
  GAP?:number
  SIZE?:number
  BASE_STROKE_WIDTH?:number
}

export interface PieChartDataEntry {
  value: number;
  color: string;
  label: string;
}

export interface PieSliceData {
  item: PieChartDataEntry;
  startAngle: number;
  index: number;
  radius: number;
  center: number;
  fullSweepAngle: number;
  gap: number;
  animatedValue: SharedValue<number>;
  strokeWidth: number;
  selectedSlice: SharedValue<number | null>;
}

export interface PieSliceContextTypes {
  slice: PieSliceData;
}

export interface CalculateAngleParams  {
  proportion: number;
  currentAngle: number;
  gap: number;
}

export interface ICreateArcPathParams {
  startAngle: number;
  endAngle: number;
  radius: number;
  center: number;
  strokeWidth: number;
}

export interface ICheckIfDistanceIsInsideArcParams {
  centerX: number;
  centerY: number;
  radius: number;
  strokeWidth: number;
  x: number;
  y: number;
}


export interface IIsPointInArcParams {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export interface ICalculateTouchAngle {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
}


export interface IHandlePieTouchParams <T>{
  centerX: number;
  centerY: number;
  data: T[];
  totalValue: number;
  radius: number;
  gap: number;
  x: number;
  y: number;

  onSlicePress: (index: number) => void;
  selectedSlice: SharedValue<number | null>;
} 
  