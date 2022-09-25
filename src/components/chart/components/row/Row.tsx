import styles from "./Row.module.css";

interface Props {
  xAxis: string[];
  yAxis: string[];
  writeData:boolean;
  xAxisData:string;
}
export const Row = (props: Props) => {
  const { xAxis, yAxis,writeData,xAxisData } = props;

  const newXAxis = [...xAxis];
  newXAxis.unshift(xAxisData);
  
  return (
    <>
          {newXAxis.map((item,ind)=>{
            return(
              <th className={`${styles.cell}  ${!writeData && ind !== 0 ? styles.isBorder : ''}`} key={ind}>
                  {writeData && item}
                  {!writeData && ind === 0 && item}
              </th>
              )
            })}
    </>
  );
};
