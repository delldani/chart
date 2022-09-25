import styles from "./Table.module.css";
import { Row} from '../row/Row'

interface Props {
  yAxis: string[];
  xAxis: string[];
}
export const Table = (props: Props) => {
  const { xAxis, yAxis } = props;


  return (
    <table className={styles.table}>
      <tbody>
       
       {[...Array(yAxis.length + 1)].map((item:string,index)=>{
        return(
           <tr key={index}>
            <Row xAxis={xAxis} yAxis={yAxis} writeData={index === yAxis.length} xAxisData={yAxis[index]}/>
          </tr>
        );
       })}
       
      </tbody>
      </table>
  );
};
