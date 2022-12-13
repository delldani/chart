import React, { useRef } from "react";
import styles from "./DataColumn.module.css";
import { COLUMN_COLORS, COLUMN_WIDTH } from "../../default";
import { useEffectOnce } from "../../helper";
interface DataColumnProps {
  dataColumn: number[];
  inColumn: (x: number, y: number, height: number, color: string) => void;
  hideTooltip: () => void;
}
export const DataColumn = (props: DataColumnProps) => {
  const { dataColumn, inColumn, hideTooltip } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffectOnce(() => {
    console.log("11");
    if (wrapperRef.current) {
      const elements = wrapperRef.current.children;

      dataColumn.map((height, ind) => {
        (elements.item(ind) as HTMLDivElement).style.height = `${
          height * 40
        }px`;
      });
    }
  });

  return (
    <div
      ref={wrapperRef}
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
              height: 0,
              width: `${COLUMN_WIDTH}px`,
              backgroundColor: COLUMN_COLORS[ind],
            }}
            onMouseMove={(e) =>
              inColumn(e.pageX, e.pageY, height, COLUMN_COLORS[ind])
            }
            onMouseLeave={hideTooltip}
          />
        );
      })}
    </div>
  );
};
