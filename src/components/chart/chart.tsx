import React from "react";
import styles from "./Chart.module.css";
import { Table } from "./components/table/Table";
import { PieChart } from "./components/pieChart/PieChart";
import { COLUMN_COLORS } from "./default";

export type PiePrecentType = { precent: number; color: string }[];
interface ChartProps {
  yAxis: string[];
  xAxis: string[];
  dataColumns: number[][];
  piePrecent: PiePrecentType;
  chartType: "bar" | "line" | "pie";
}

export const Chart = (props: ChartProps) => {
  const { xAxis, yAxis, dataColumns, chartType, piePrecent } = props;
  const toolTipRef = React.useRef<HTMLDivElement>(null);
  const [activeColumn, setActiveColumn] = React.useState({
    color: "",
    height: 0,
  });

  const newX = React.useMemo(() => xAxis, [xAxis]);
  const newY = React.useMemo(() => yAxis, [yAxis]);
  const newDataColums = React.useMemo(() => dataColumns, [dataColumns]);

  const inColumn = React.useCallback(
    (x: number, y: number, height: number, color: string) => {
      if (toolTipRef.current) {
        setActiveColumn({ color, height });
        toolTipRef.current.style.display = "block";
        toolTipRef.current.style.top = `${y}px`;
        toolTipRef.current.style.left = `${x + 10}px`;
      }
    },
    []
  );

  const hideTooltip = React.useCallback(() => {
    if (toolTipRef.current) {
      toolTipRef.current.style.display = "none";
    }
  }, []);

  const inNode = React.useCallback(
    (x: number, y: number, nodeLineIndex: number, nodeIndex: number) => {
      if (toolTipRef.current) {
        setActiveColumn({
          color: COLUMN_COLORS[nodeLineIndex],
          height: dataColumns[nodeIndex][nodeLineIndex],
        });
        toolTipRef.current.style.display = "block";
        toolTipRef.current.style.top = `${y}px`;
        toolTipRef.current.style.left = `${x + 30}px`;
      }
    },
    []
  );

  return (
    <div className={styles.main}>
      {chartType === "pie" ? (
        <PieChart piePrecent={piePrecent} />
      ) : (
        <Table
          xAxis={newX}
          yAxis={newY}
          dataColumns={newDataColums}
          chartType={chartType}
          inColumn={inColumn}
          hideTooltip={hideTooltip}
          inNode={inNode}
        />
      )}

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
