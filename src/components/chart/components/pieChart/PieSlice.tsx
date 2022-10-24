import styles from "./PieSlice.module.css";

interface PieSliceProps {
  startPrecent: number;
  endPrecent:number;
  baseColor:string;
  sliceColor:string;
}

export const PieSlice = (props: PieSliceProps) => {
  const { baseColor,endPrecent,startPrecent,sliceColor } = props;

  return (
      <div className={styles.pie} style={{backgroundColor:baseColor}}>
        <div className={styles.cover1} style={{ transform: `rotate(${360*(startPrecent/100)}deg)`,backgroundColor:sliceColor}}/>
        <div className={styles.cover2} style={{backgroundColor:baseColor,  transform: `rotate(${360*(endPrecent/100)}deg)`}}/>
      </div>
  );
};
