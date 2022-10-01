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
  const toolTipRef = React.useRef<HTMLDivElement>(null);

  const newX = React.useMemo(()=>xAxis,[xAxis]);
  const newY = React.useMemo(()=>yAxis,[yAxis]);
  const newDataColums = React.useMemo(()=>dataColumns,[dataColumns]);

  const inColumn = (x:number,y:number, height:number)=>{
    if(toolTipRef.current){
      toolTipRef.current.style.display = 'block';
      toolTipRef.current.style.top = `${y}px`;
      toolTipRef.current.style.left = `${x}px`;
    }
  };
  const outColumn = ()=>{
    if(toolTipRef.current){
      toolTipRef.current.style.display = 'none';
    }
  };

  return (
    <div className={styles.main}>
      <Table xAxis={newX} yAxis={newY} dataColumns={newDataColums} chartType={chartType} inColumn={inColumn} outColumn={outColumn}/>
      <div className={styles.tooltip} ref={toolTipRef}/>
    </div>
  );
};
