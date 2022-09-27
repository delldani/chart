import styles from "./Row.module.css";

interface RowProps {
  xAxis: string[];
  yAxis: string[];
  dataColumns?:number[];
  rowIndex:number;
  xAxisLabel:string;
}
export const Row = (props: RowProps) => {
  const { xAxis, yAxis, rowIndex,xAxisLabel, dataColumns } = props;

  const newXAxis = [...xAxis];
  newXAxis.unshift(xAxisLabel);
  
  const lastRow = rowIndex === yAxis.length; // ahova az x tengely feliratai kerülnek
  const dataColumnRow = rowIndex === yAxis.length -1; // ahova az oszlopok kerülnek, a legalsó sor
  return (
    <>
          {newXAxis.map((item,ind)=>{
            const firstColumn = ind === 0;
            const dataColumnHeight = dataColumns && dataColumns[ind-1] * 41 ;
            return(
              <th className={`${styles.cell}  ${lastRow  ? styles.xaxislabel : ''} ${firstColumn ? styles.yaxislabel : ''}`} key={ind}>
                  {lastRow && item}
                  {!lastRow && firstColumn && item}
                  {dataColumnRow && !firstColumn &&<div className={styles.datacolumn} style={{height:dataColumnHeight}}/>}
              </th>
              )
            })}
    </>
  );
};
