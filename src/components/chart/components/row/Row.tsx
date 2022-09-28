import React from "react";
import styles from "./Row.module.css";

interface RowProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns?: number[];
  rowIndex: number;
  xAxisLabel: string;
}
export const Row = (props: RowProps) => {
  const { xAxis, yAxis, rowIndex, xAxisLabel, dataColumns } = props;

  React.useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const circle = new Path2D();
      circle.arc(100, 35, 25, 0, 2 * Math.PI);

      ctx.fill(circle);
    }
  }, []);

  const newXAxis = [...xAxis];
  newXAxis.unshift(xAxisLabel);

  const lastRow = rowIndex === yAxis.length; // ahova az x tengely feliratai kerülnek
  const dataColumnRow = rowIndex === yAxis.length - 1; // ahova az oszlopok kerülnek, a legalsó sor
  return (
    <>
      {newXAxis.map((item, ind) => {
        const firstColumn = ind === 0;
        const dataColumnHeight = dataColumns && dataColumns[ind - 1] * 41;
        return (
          <th
            className={`${styles.cell}  ${lastRow ? styles.xaxis_label : ""} ${
              firstColumn ? styles.yaxis_label : ""
            }`}
            key={ind}
          >
            {lastRow && item}
            {!lastRow && firstColumn && item}
            {dataColumnRow && !firstColumn && (
              <div
                className={styles.data_column}
                style={{ height: dataColumnHeight }}
              />
            )}
            {ind === 1 && rowIndex === yAxis.length - 1 && (
              <canvas
                id="canvas"
                className="chart_canvas"
                style={{
                  width: `calc(400% + ${xAxis.length}px)`,
                  height: `calc(700% + ${yAxis.length}px)`,
                  backgroundColor: "red",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              >
                itt egy grafikon látható
              </canvas>
            )}
          </th>
        );
      })}
    </>
  );
};
