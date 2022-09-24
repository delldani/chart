import styles from "./Cells.module.css";

interface Props {
  height: number;
}
export const Cells = (props: Props) => {
  const { height } = props;
  return (
    <div className={styles.cells}>
      {[...Array(height)].map((item, ind) => {
        return <div className={styles.cell} key={ind} />;
      })}
    </div>
  );
};
