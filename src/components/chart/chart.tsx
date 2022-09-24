import styles from "./Chart.module.css";
import { Columns } from "./components/columns/Columns";

interface Props {
  yAxis: string[];
  xAxis: string[];
}
export const Chart = (props: Props) => {
  const { xAxis, yAxis } = props;
  return (
    <div className={styles.main}>
      <Columns xAxis={xAxis} yAxis={yAxis} />
    </div>
  );
};
