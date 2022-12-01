import React from "react";
import { makePieGradient, checkPercentAre100 } from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  const slice = new Path2D();
  const canvas = document.querySelector("canvas");
  const ctx = canvas?.getContext("2d");

  const circle = new Path2D();

  React.useEffect(() => {
    // ctx?.beginPath();
    // circle.arc(100, 100, 50, 0, 2 * Math.PI);
    // (ctx as CanvasFillStrokeStyles).fillStyle = "red";
    // ctx?.fill(circle);
    // ctx?.stroke(circle);
    // ctx?.beginPath();
    // ctx.arc(50,50, 50, Math.PI/2,  Math.PI);
    // let portionAngle = 15 * 2 * Math.PI;
    //drawing an arc and a line to the center to differentiate the slice from the rest
    // ctx?.beginPath();
    // ctx?.arc(100, 100, 100, 0,  portionAngle);
    // ctx?.lineTo(100, 100);
    //filling the slices with the corresponding mood's color
    // ctx?.fill();

    ctx?.beginPath();
    slice?.moveTo(100, 100);
    slice?.lineTo(100, 50);
    slice?.arc(100, 100, 50, 1.5 * Math.PI, 1.75 * Math.PI);
    //0', 10'
    slice?.lineTo(100, 100);
    ctx?.stroke(slice);
    (ctx as CanvasFillStrokeStyles).fillStyle = "red";
    ctx?.fill(slice);
    // ctx?.rotate(45 * Math.PI / 180);
    // ctx?.translate(50,100);
  }, []);

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const isPointInPath = ctx?.isPointInPath(
      slice,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    console.log(isPointInPath);
  };

  return (
    <>
      <div
        className={styles.gradient}
        style={{
          background: pieGradient,
        }}
      />
      <canvas
        width="200"
        height="200"
        onMouseMove={onMouseMove}
        style={{ border: "1px solid black" }}
      ></canvas>
    </>
  );
};
