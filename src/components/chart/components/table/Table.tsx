import styles from "./Table.module.css";
import { Row} from '../row/Row'

interface Props {
  yAxis: string[];
  xAxis: string[];
  dataColumns:number[];
}
export const Table = (props: Props) => {
  const { xAxis, yAxis, dataColumns } = props;

  return (
    <table className={styles.table}>
      <tbody>
       
       {[...Array(yAxis.length + 1)].map((item:string,index)=>{
        return(
           <tr key={index}>
            <Row xAxis={xAxis} yAxis={yAxis} dataColumns={dataColumns} rowIndex={index} xAxisLabel={yAxis[yAxis.length - 1 - index]}/>
          </tr>
        );
       })}
       
      </tbody>
      </table>
  );
};
