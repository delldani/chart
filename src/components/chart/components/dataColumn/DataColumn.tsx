import React from "react";
import styles from "./DataColumn.module.css";
import { COLUMN_COLORS, COLUMN_WIDTH } from "../../default";
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
