import React from "react";
import styles from "./DataColumn.module.css";

interface DataColumnProps {
  dataColumn: number[];
}
export const DataColumn = (props: DataColumnProps) => {
  const {  dataColumn } = props;

  return (
              <div className={styles.column_wrapper} >
                {dataColumn.map((height)=>{
                    return(  <div
                className={styles.data_column}
                style={{ height: height * 40 }}
                />);
                })}
              </div>
  )
};
