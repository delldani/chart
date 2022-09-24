import styles from "./Columns.module.css";
import { Cells } from "../cells/Cells";

interface Props {
  yAxis: string[];
  xAxis: string[];
}
export const Columns = (props: Props) => {
  const { xAxis, yAxis } = props;
  return (
    <div className={styles.main}>
      <Cells height={yAxis.length} />
    </div>
  );
};
