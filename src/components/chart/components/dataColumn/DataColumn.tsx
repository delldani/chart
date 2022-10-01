import React from "react";
import styles from "./DataColumn.module.css";

const COLUMN_WIDTH = 15;
interface DataColumnProps {
  dataColumn: number[];
  inColumn:(x:number,y:number, height:number)=>void;
  outColumn:()=>void;
}
export const DataColumn = (props: DataColumnProps) => {
  const {  dataColumn,inColumn,outColumn } = props;

  return (
            <div className={styles.column_wrapper} style={{left:`calc(50% - ${dataColumn.length * COLUMN_WIDTH / 2}px)`}}>
             {dataColumn.map((height)=>{
                return(  <div
                className={styles.data_column}
                style={{width: `${COLUMN_WIDTH}px`, height: height * 40 }}
                 onMouseMove={(e)=>inColumn(e.pageX,e.pageY,height)}
                 onMouseLeave={outColumn}
                 />);
                })}
            </div>
  )
};
