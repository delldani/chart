import React from "react";
import styles from "./PieChart.module.css";

interface PieChartProps {
  piePrecent: number[];
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  return <div className={styles.pie}></div>;
};
