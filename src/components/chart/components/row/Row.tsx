import React from "react";
import styles from "./Row.module.css";
import { drawNodes } from "../../helper";
import { DataColumn } from "../dataColumn/DataColumn";
import { LineChart } from "../lineChart/LineChart";

interface RowProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns: number[][];
  rowIndex: number;
  xAxisLabel: string;
  chartType: "bar" | "line";
  inColumn: (x: number, y: number, height: number, color: string) => void;
  outColumn: () => void;
}
export const Row = (props: RowProps) => {
  const {
    xAxis,
    yAxis,
    rowIndex,
    xAxisLabel,
    dataColumns,
    chartType,
    inColumn,
    outColumn,
  } = props;

  const newXAxis = [...xAxis];
  newXAxis.unshift(xAxisLabel);

  const lastRow = rowIndex === yAxis.length; // ahova az x tengely feliratai kerülnek
  const dataColumnRow = rowIndex === yAxis.length - 1; // ahova az oszlopok kerülnek, feliratok feletti sor

  return (
    <>
      {newXAxis.map((item, ind) => {
        const firstColumn = ind === 0;
        const isDataColumn =
          dataColumnRow && !firstColumn && chartType === "bar";
        const isLineChart =
          ind === 1 && rowIndex === yAxis.length - 1 && chartType === "line";

        return (
          <th
            className={`${styles.cell}  ${lastRow ? styles.xaxis_label : ""} ${
              firstColumn ? styles.yaxis_label : ""
            }`}
            key={ind}
          >
            {lastRow && item}
            {!lastRow && firstColumn && item}
            {isDataColumn && (
              <DataColumn
                dataColumn={dataColumns[ind - 1]}
                inColumn={inColumn}
                outColumn={outColumn}
              />
            )}
            {isLineChart && (
              <LineChart
                xAxis={xAxis}
                yAxis={yAxis}
                dataColumns={dataColumns}
              />
            )}
          </th>
        );
      })}
    </>
  );
};
