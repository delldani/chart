import {
  makePieGradient,
  checkPercentAre100,
} from "../../helper";
import styles from "./PieChartNoAnimation.module.css";
import { PiePercentType } from "../../chart";

interface PieChartProps {
  piePercent: PiePercentType;
}

/**
 * Pie chart animációk nélkül css gradientel megoldva
 * @param props 
 * @returns 
 */
export const PieChartNoAnimation = (props: PieChartProps) => {
  const { piePercent } = props;

  if (!checkPercentAre100(piePercent)) {
    console.warn("nem adnak 100% ot ki a szeletek");
    return null;
  }
  const pieGradient = makePieGradient(piePercent);
  return (
      <div
        className={styles.gradient}
        style={{
          background: pieGradient,
        }}
      />
  );
};
