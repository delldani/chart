import React from "react";
import styles from "./Table.module.css";
import { Row } from "../row/Row";

interface TableProps {
  yAxis: string[];
  xAxis: string[];
  dataColumns: number[][];
  chartType: "bar" | "line";
  inColumn: (x: number, y: number, height: number, color: string) => void;
  inNode: (
    x: number,
    y: number,
    nodeLineIndex: number,
    nodeIndex: number
  ) => void;
  hideTooltip: () => void;
}
export const Table = React.memo((props: TableProps) => {
  const {
    xAxis,
    yAxis,
    dataColumns,
    chartType,
    inColumn,
    hideTooltip,
    inNode,
  } = props;

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
                hideTooltip={hideTooltip}
                inNode={inNode}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
