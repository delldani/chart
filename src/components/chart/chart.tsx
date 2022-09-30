import React from "react";
import styles from "./Chart.module.css";
import { Table} from "./components/table/Table";

interface ChartProps {
  yAxis: string[];
  xAxis: string[];
  dataColumns:number[][];
  chartType: 'bar' | 'line';
}

export const Chart = (props: ChartProps) => {
  const { xAxis, yAxis, dataColumns,chartType} = props;
  const newX = React.useMemo(()=>xAxis,[xAxis]);
  const newY = React.useMemo(()=>yAxis,[yAxis]);
  const newDataColums = React.useMemo(()=>dataColumns,[dataColumns]);
  return (
    <div className={styles.main}>
      <Table xAxis={newX} yAxis={newY} dataColumns={newDataColums} chartType={chartType}/>
    </div>
  );
};
