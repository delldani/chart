import React from "react";
import styles from "./Row.module.css";
import { drawNodes } from '../../helper';
import { DataColumn } from '../dataColumn/DataColumn';

interface RowProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns: number[][];
  rowIndex: number;
  xAxisLabel: string;
  chartType: 'bar' | 'line';
}
export const Row = (props: RowProps) => {
  const { xAxis, yAxis, rowIndex, xAxisLabel, dataColumns,chartType } = props;

  React.useEffect(() => {
   if(chartType === 'line'){
     drawNodes(dataColumns.map((arr)=>arr[0]),yAxis.length);
     drawNodes(dataColumns.map((arr)=>arr[1]),yAxis.length);
   }
  }, [chartType]);

  const newXAxis = [...xAxis];
  newXAxis.unshift(xAxisLabel);

  const lastRow = rowIndex === yAxis.length; // ahova az x tengely feliratai kerülnek
  const dataColumnRow = rowIndex === yAxis.length - 1; // ahova az oszlopok kerülnek, a legalsó sor
  return (
    <>
      {newXAxis.map((item, ind) => {
        const firstColumn = ind === 0;
        // const dataColumnHeight = dataColumns[ind - 1] * 40;
        // const dataColumnHeight2 = dataColumns2[ind - 1] * 40;
        return (
          <th
            className={`${styles.cell}  ${lastRow ? styles.xaxis_label : ""} ${
              firstColumn ? styles.yaxis_label : ""
            }`}
            key={ind}
          >
            {lastRow && item}
            {!lastRow && firstColumn && item}
            {dataColumnRow && !firstColumn && chartType === 'bar' &&(
            <DataColumn dataColumn={dataColumns[ind - 1]}/>
            )}
            {ind === 1 && rowIndex === yAxis.length - 1 && chartType === 'line' &&(
              <canvas
                id="canvas"
                className="canvas1"
                width={xAxis.length * 100 + '%'}
                height={yAxis.length * 40}
                style={{
                  width: `calc(400% + ${xAxis.length}px)`,
                  height: `calc(700% + ${yAxis.length}px)`,
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
