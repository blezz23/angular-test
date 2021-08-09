import { ChartType, Row } from "angular-google-charts";

export interface ChartModel {
  id: number;
  symbol: string;
  type: ChartType;
  data: Row[];
  show: boolean;
}
