import styles from "./Chart.module.css";
import { Table} from "./components/table/Table";

interface Props {
  yAxis: string[];
  xAxis: string[];
}
export const Chart = (props: Props) => {
  const { xAxis, yAxis } = props;
  return (
    <div className={styles.main}>
      <Table xAxis={xAxis} yAxis={yAxis} />
    </div>
  );
};
