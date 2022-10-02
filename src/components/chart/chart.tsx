import React from "react";
import styles from "./Chart.module.css";
import { Table } from "./components/table/Table";

interface ChartProps {
  yAxis: string[];
  xAxis: string[];
  dataColumns: number[][];
  chartType: "bar" | "line";
}

export const Chart = (props: ChartProps) => {
  const { xAxis, yAxis, dataColumns, chartType } = props;
  const toolTipRef = React.useRef<HTMLDivElement>(null);
  const [activeColumn, setActiveColumn] = React.useState({
    color: "",
    height: 0,
  });

  const newX = React.useMemo(() => xAxis, [xAxis]);
  const newY = React.useMemo(() => yAxis, [yAxis]);
  const newDataColums = React.useMemo(() => dataColumns, [dataColumns]);

  const inColumn = (x: number, y: number, height: number, color: string) => {
    if (toolTipRef.current) {
      setActiveColumn({ color, height });
      toolTipRef.current.style.display = "block";
      toolTipRef.current.style.top = `${y}px`;
      toolTipRef.current.style.left = `${x + 10}px`;
    }
  };
  const outColumn = () => {
    if (toolTipRef.current) {
      toolTipRef.current.style.display = "none";
    }
  };

  return (
    <div className={styles.main}>
      <Table
        xAxis={newX}
        yAxis={newY}
        dataColumns={newDataColums}
        chartType={chartType}
        inColumn={inColumn}
        outColumn={outColumn}
      />
      <div className={styles.tooltip} ref={toolTipRef}>
        <div className={styles.wrapper}>
          <div
            className={styles.marker}
            style={{ backgroundColor: activeColumn.color }}
          />
          <div className={styles.marker_elem}>:</div>
          <div className={styles.marker_value}>{activeColumn.height}</div>
        </div>
      </div>
    </div>
  );
};
