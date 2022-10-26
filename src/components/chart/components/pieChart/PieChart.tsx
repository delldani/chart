import React from "react";
import styles from "./PieChart.module.css";
import { PieSlice } from "./PieSlice";

interface PieChartProps {
  piePrecent: number[];
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  return (
    <>
      {/* <div className={styles.pie}></div>
      <div className={styles.pie2}></div>
      <div className={styles.pie3}>
        <div className={styles.pie3_1}></div>
        <div className={styles.pie3_2}></div>
      </div> */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <PieSlice
            baseColor="green"
            sliceColor="red"
            startPrecent={0}
            endPrecent={25}
          />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <PieSlice
            baseColor="green"
            sliceColor="blue"
            startPrecent={25}
            endPrecent={60}
          />
        </div>
      </div>
    </>
  );
};
