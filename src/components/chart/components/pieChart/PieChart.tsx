import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  makeSlice
} from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";
import path from "path";
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  const sliceRef = React.useRef<Path2D>(new Path2D());
  const sliceRef2 = React.useRef<Path2D>(new Path2D());
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvasRef.current = document.querySelector("canvas");
    ctxRef.current = canvasRef.current?.getContext("2d");
    const ctx = ctxRef.current;
    const slice = sliceRef.current;
    const slice2 = sliceRef2.current;
    if (ctx && slice) {
      makeSlice(slice, 45, 200, 55);
      ctx.stroke(slice);
      (ctx as CanvasFillStrokeStyles).fillStyle = "red";
      ctx.fill(slice);

      makeSlice(slice2, 200, 270, 50);
      ctx.stroke(slice2);
      (ctx as CanvasFillStrokeStyles).fillStyle = "green";
      ctx.fill(slice2);
    }
  });

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const slice = sliceRef.current;
    const slice2 = sliceRef2.current;
    if (ctxRef.current) {
      const isPointInPath = ctxRef.current.isPointInPath(
        slice,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      const isPointInPath2 = ctxRef.current.isPointInPath(
        slice2,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      console.log(isPointInPath && "red", isPointInPath2 && "green");
    }
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
