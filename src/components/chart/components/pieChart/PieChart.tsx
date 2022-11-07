import { makePieGradient, checkPercentAre100 } from "../../helper";
import styles from "./PieChart.module.css";
import { PieSlice } from "./PieSlice";
import { PiePrecentType } from "../../chart";
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  const pieGradient = makePieGradient(piePrecent);

  return (
    <>
      {/* <div className={styles.pie}></div>
      <div className={styles.pie2}></div>
      <div className={styles.pie3}>
        <div className={styles.pie3_1}></div>
        <div className={styles.pie3_2}></div>
      </div> */}
      <div style={{ position: "relative" }}>
        {/* <div style={{ position: "absolute", top: 0, left: 0 }}> */}
        <PieSlice
          baseColor="green"
          sliceColor="red"
          startPrecent={0}
          endPrecent={40}
        />
        {/* </div> */}
      </div>
      <div
        style={{
          width: 0,
          height: 0,
          borderRight: "60px solid purple",
          borderTop: "60px solid transparent",
          borderLeft: "60px solid transparent",
          borderBottom: "60px solid transparent",
          borderRadius: "60px",
        }}
      />
      <div
        className={styles.gradient}
        style={{
          background: pieGradient,
        }}
      />
    </>
  );
};
