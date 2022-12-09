import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  makeSlice,
  percentToDegree,
  makeStepByStepSlices,
  getRadius,
} from "../../helper";
import { RADIUS, CANVAS_WIDTH } from "../../default";
import styles from "./PieChart.module.css";
import { PiePercentType } from "../../chart";

interface PieChartProps {
  piePercent: PiePercentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePercent } = props;

  let percentToPercentArray: number[] = makeStepByStepSlices(piePercent);
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
    drawSlices(ctxRef.current, activeSlice);
  });

  const drawSlices = (
    ctx: CanvasRenderingContext2D | null | undefined,
    activeSlice: (index: number) => boolean
  ) => {
    if (ctx) {
      slices.current.forEach((slice, index) => {
        const radius = getRadius(RADIUS, activeSlice(index));

        const startDegree = percentToDegree(percentToPercentArray[index]);
        const endDegree =
          slices.current.length - 1 === index
            ? 360
            : percentToDegree(percentToPercentArray[index + 1]);
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
        (ctx as CanvasFillStrokeStyles).fillStyle = piePercent[index].color;
        ctx.fill(slice);
      });
    }
  };

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
        drawSlices(ctx, activeSlice);
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
