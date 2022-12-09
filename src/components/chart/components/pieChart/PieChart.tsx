import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  drawSlices,
  paintSlices,
} from "../../helper";
import { CANVAS_WIDTH } from "../../default";
import styles from "./PieChart.module.css";
import { PiePercentType } from "../../chart";

interface PieChartProps {
  piePercent: PiePercentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePercent } = props;

  let activeSliceIndex = -1;
  const slices = React.useRef<Path2D[]>(piePercent.map((item) => new Path2D()));
  let canvas: HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas = document.querySelector("canvas");
    ctxRef.current = canvas?.getContext("2d");
    const activeSlice = (index: number) => false;
    slices.current = drawSlices(ctxRef.current, activeSlice, piePercent);
    paintSlices(ctxRef.current, slices, piePercent);
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
          if (activeSliceIndex !== index) {
            activeSliceIndex = index;
            changed = index;
          }
        }
      });
      if (changed !== null || noActiveSlice) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        const activeSlice = (index: number) => {
          return noActiveSlice ? false : changed === index;
        };
        slices.current = drawSlices(ctx, activeSlice, piePercent);
        paintSlices(ctxRef.current, slices, piePercent);
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
