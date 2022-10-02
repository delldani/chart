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
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pathArray = React.useRef<Path2D[][]>([]);

  pathArray.current = [];

  React.useEffect(() => {
    for (let i = 0; i < dataColumns[0].length; i++) {
      const path2DArray = drawNodes(
        dataColumns.map((arr) => arr[i]),
        yAxis.length,
        COLUMN_COLORS[i]
      );
      pathArray.current.push(path2DArray);
    }

    // const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // if (canvas && canvas.getContext) {
    //   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        const path = pathArray.current[0][0];
        // console.log(pathArray.current);
        const x = e.clientX - canvasRef.current?.getBoundingClientRect().left;
        const y = e.clientY - canvasRef.current?.getBoundingClientRect().top;
        ctx.isPointInStroke(path, x, y) && console.log("benne");
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
    >
      itt egy grafikon látható
    </canvas>
  );
};
