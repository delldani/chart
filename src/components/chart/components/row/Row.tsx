import React from "react";
import styles from "./Row.module.css";
import { drawNodes } from '../../helper';

interface RowProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns: number[];
  rowIndex: number;
  xAxisLabel: string;
  chartType: 'bar' | 'line';
}
export const Row = (props: RowProps) => {
  const { xAxis, yAxis, rowIndex, xAxisLabel, dataColumns,chartType } = props;
  const dataColumns2 = [1.5,3.2,5,2];

  React.useEffect(() => {
   if(chartType === 'line'){
     drawNodes(dataColumns,yAxis.length);
     drawNodes(dataColumns2,yAxis.length);
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
        const dataColumnHeight = dataColumns[ind - 1] * 40;
        const dataColumnHeight2 = dataColumns2[ind - 1] * 40;
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
              <div style={{display:'flex',bottom:0,left:'50%',position:'absolute',alignItems:'end',gap:'5px'}}>
              <div
                className={styles.data_column}
                style={{ height: dataColumnHeight }}
                />
              <div
              className={styles.data_column}
              style={{ height: dataColumnHeight2 }}
              />
              </div>
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
