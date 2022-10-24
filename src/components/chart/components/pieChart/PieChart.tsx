import React from "react";
import styles from "./PieChart.module.css";
import { PieSlice} from './PieSlice';

interface PieChartProps {
  piePrecent: number[];
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  return (
    <>
      <div className={styles.pie}></div>
      <div className={styles.pie2}></div>
      <div className={styles.pie3}>
        <div className={styles.pie3_1}></div>
        <div className={styles.pie3_2}></div>
      </div>
      <PieSlice baseColor="green" sliceColor='red' startPrecent={10} endPrecent={30}/>
    </>
  );
};
