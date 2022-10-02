import React from "react";
import styles from "./Table.module.css";
import { Row } from "../row/Row";

interface TableProps {
  yAxis: string[];
  xAxis: string[];
  dataColumns: number[][];
  chartType: "bar" | "line";
  inColumn: (x: number, y: number, height: number, color: string) => void;
  outColumn: () => void;
}
export const Table = React.memo((props: TableProps) => {
  const { xAxis, yAxis, dataColumns, chartType, inColumn, outColumn } = props;

  return (
    <table className={styles.table}>
      <tbody>
        {[...Array(yAxis.length + 1)].map((item: string, index) => {
          return (
            <tr key={index}>
              <Row
                xAxis={xAxis}
                yAxis={yAxis}
                dataColumns={dataColumns}
                rowIndex={index}
                xAxisLabel={yAxis[yAxis.length - 1 - index]}
                chartType={chartType}
                inColumn={inColumn}
                outColumn={outColumn}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
