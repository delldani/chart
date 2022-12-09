import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  drawSlices,
} from "../../helper";
import { CANVAS_WIDTH } from "../../default";
import styles from "./PieChart.module.css";
import { PiePercentType } from "../../chart";

interface PieChartProps {
  piePercent: PiePercentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePercent } = props;

  const activeSliceArray = Array(piePercent.length).fill(null);
  const slices = React.useRef<Path2D[]>(piePercent.map((item) => new Path2D()));
  let canvas: HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas = document.querySelector("canvas");
    ctxRef.current = canvas?.getContext("2d");
    const activeSlice = (index: number) => false;
    drawSlices(ctxRef.current, activeSlice, piePercent, slices);
  });
  const pieGradient = makePieGradient(piePercent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;

    if (ctx) {
      let changed: null | number = null;
      let noActiveSlice = true;
      slices.current.map((slice, index) => {
        const isPointInPath = ctx.isPointInPath(
          slice,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        );
        if (isPointInPath) {
          noActiveSlice = false;
          if (activeSliceArray[index] === null) {
            activeSliceArray[index] = 1;
            changed = index;
          }
        } else {
          activeSliceArray[index] = null;
        }
      });
      if (changed !== null || noActiveSlice) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
        slices.current.forEach((item, ind, arr) => (arr[ind] = new Path2D()));
        const activeSlice = (index: number) => {
          return noActiveSlice ? false : changed === index;
        };
        drawSlices(ctx, activeSlice, piePercent, slices);
      }
    }
  };

  if (!checkPercentAre100(piePercent)) {
    console.warn("nem adnak 100% ot ki a szeletek");
    return null;
  }

  return (
    <>
      <div
        className={styles.gradient}
        style={{
          background: pieGradient,
        }}
      />
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_WIDTH}
        onMouseMove={onMouseMove}
      ></canvas>
    </>
  );
};
