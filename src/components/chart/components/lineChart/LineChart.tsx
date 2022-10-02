import React from "react";
import { drawNodes } from "../../helper";
import { COLUMN_COLORS } from "../../default";
interface LineChartProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns: number[][];
}
export const LineChart = (props: LineChartProps) => {
  const { xAxis, yAxis, dataColumns } = props;

  React.useEffect(() => {
    for (let i = 0; i < dataColumns[0].length; i++) {
      drawNodes(
        dataColumns.map((arr) => arr[i]),
        yAxis.length,
        COLUMN_COLORS[i]
      );
    }
  }, []);

  return (
    <canvas
      id="canvas"
      className="canvas1"
      width={xAxis.length * 100 + "%"}
      height={yAxis.length * 40}
      style={{
        width: `calc(400% + ${xAxis.length}px)`,
        height: `calc(700% + ${yAxis.length}px)`,
      }}
    >
      itt egy grafikon látható
    </canvas>
  );
};
