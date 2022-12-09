import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  makeSlice,
  percentToDegree,
  makeStepByStepSlices,
} from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";

const RADIUS = 150;
const CANVAS_WIDTH = RADIUS + 200;
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  let stepByStepSlices: number[] = makeStepByStepSlices(piePrecent);
  const activeSliceArray = Array(piePrecent.length).fill(null);
  const slices = React.useRef<Path2D[]>(piePrecent.map((item) => new Path2D()));
  let canvas: HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas = document.querySelector("canvas");
    ctxRef.current = canvas?.getContext("2d");
    const ctx = ctxRef.current;

    slices.current.forEach((slice, index) => {
      drawSlices(ctx, index, slice, RADIUS);
    });
  });

  const drawSlices = (
    ctx: CanvasRenderingContext2D | null | undefined,
    index: number,
    slice: Path2D,
    radius: number
  ) => {
    if (ctx) {
      const startDegree = percentToDegree(stepByStepSlices[index]);
      const endDegree =
        slices.current.length - 1 === index
          ? 360
          : percentToDegree(stepByStepSlices[index + 1]);
      makeSlice(
        slice,
        CANVAS_WIDTH / 2,
        CANVAS_WIDTH / 2,
        startDegree,
        endDegree,
        radius
      );
      //átlátszó legyen a vonal
      ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      ctx.stroke(slice);
      (ctx as CanvasFillStrokeStyles).fillStyle = piePrecent[index].color;
      ctx.fill(slice);
    }
  };

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;

    if (ctx) {
      let changed: null | number = null;
      let isActive = false;
      slices.current.map((slice, index) => {
        const isPointInPath = ctx.isPointInPath(
          slice,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        );
        if (isPointInPath) {
          isActive = true;
          if (activeSliceArray[index] === null) {
            // activeSlice.fill(null);
            activeSliceArray[index] = 1;
            changed = index;
          }
        } else {
          activeSliceArray[index] = null;
        }
      });
      if (changed !== null || !isActive) {
        if (ctx) {
          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
          slices.current.forEach((item, ind, arr) => (arr[ind] = new Path2D()));
          slices.current.forEach((slice, index) => {
            let radius = RADIUS;
            if (changed === index) {
              radius = RADIUS + 20;
            }
            if (!isActive) {
              radius = RADIUS;
            }
            drawSlices(ctx, index, slice, radius);
          });
        }
      }
    }
  };

  if (!checkPercentAre100(piePrecent)) {
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
