import React from "react";
import { drawNodes, useEffectOnce } from "../../helper";
import { COLUMN_COLORS } from "../../default";
interface LineChartProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns: number[][];
  inNode: (
    x: number,
    y: number,
    nodeLineIndex: number,
    nodeIndex: number
  ) => void;
  hideTooltip: () => void;
}
export const LineChart = (props: LineChartProps) => {
  const { xAxis, yAxis, dataColumns, inNode, hideTooltip } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pathArray = React.useRef<Path2D[][]>([]);

  useEffectOnce(() => {
    for (let i = 0; i < dataColumns[0].length; i++) {
      const path2DArray = drawNodes(
        dataColumns.map((arr) => arr[i]),
        yAxis.length,
        COLUMN_COLORS[i]
      );
      pathArray.current.push(path2DArray);
    }
  });

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        pathArray.current.forEach((nodeLine, nodeLineIndex) => {
          nodeLine.forEach((node, nodeIndex) => {
            if (canvasRef.current) {
              const x =
                e.clientX - canvasRef.current?.getBoundingClientRect().left;
              const y =
                e.clientY - canvasRef.current?.getBoundingClientRect().top;
              ctx.isPointInStroke(node, x, y) &&
                inNode(x, y, nodeLineIndex, nodeIndex);
            }
          });
        });
      }
    }
  };

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="canvas1"
      width={xAxis.length * 100 + "%"}
      height={yAxis.length * 40}
      style={{
        width: `calc(400% + ${xAxis.length}px)`,
        height: `calc(700% + ${yAxis.length}px)`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={hideTooltip}
    >
      itt egy grafikon látható
    </canvas>
  );
};
