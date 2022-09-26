import styles from "./Chart.module.css";
import { Table} from "./components/table/Table";

interface Props {
  yAxis: string[];
  xAxis: string[];
  dataColumns:number[];
}
export const Chart = (props: Props) => {
  const { xAxis, yAxis, dataColumns} = props;
  return (
    <div className={styles.main}>
      <Table xAxis={xAxis} yAxis={yAxis} dataColumns={dataColumns}/>
    </div>
  );
};
