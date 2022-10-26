import styles from "./PieSlice.module.css";

interface PieSliceProps {
  startPrecent: number;
  endPrecent: number;
  baseColor: string;
  sliceColor: string;
}

export const PieSlice = (props: PieSliceProps) => {
  const { baseColor, endPrecent, startPrecent, sliceColor } = props;

  const biggerThanHalf = endPrecent - startPrecent > 50;

  return (
    <div
      className={styles.pie}
      style={{
        backgroundColor: baseColor,
        backgroundImage: `linear-gradient(to right, transparent 50%, ${sliceColor} 0)`,
        transform: `rotate(${360 * (startPrecent / 100)}deg)`,
      }}
    >
      <div
        className={styles.cover1}
        style={{
          transform: `rotate(${
            360 *
            ((biggerThanHalf
              ? endPrecent - startPrecent - 50
              : endPrecent - startPrecent) /
              100)
          }deg)`,
          backgroundColor: biggerThanHalf ? sliceColor : baseColor,
        }}
      />
    </div>
  );
};
