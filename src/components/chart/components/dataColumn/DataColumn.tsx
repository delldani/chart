import React from "react";
import styles from "./DataColumn.module.css";

const COLUMN_COLORS = ["#d64161", "#6b5b95", "#feb236"];
const COLUMN_WIDTH = 15;
interface DataColumnProps {
  dataColumn: number[];
  inColumn: (x: number, y: number, height: number, color: string) => void;
  outColumn: () => void;
}
export const DataColumn = (props: DataColumnProps) => {
  const { dataColumn, inColumn, outColumn } = props;

  return (
    <div
      className={styles.column_wrapper}
      style={{
        left: `calc(50% - ${(dataColumn.length * COLUMN_WIDTH) / 2}px)`,
      }}
    >
      {dataColumn.map((height, ind) => {
        return (
          <div
            key={ind}
            className={styles.data_column}
            style={{
              width: `${COLUMN_WIDTH}px`,
              height: height * 40,
              backgroundColor: COLUMN_COLORS[ind],
            }}
            onMouseMove={(e) =>
              inColumn(e.pageX, e.pageY, height, COLUMN_COLORS[ind])
            }
            onMouseLeave={outColumn}
          />
        );
      })}
    </div>
  );
};
