import React from "react";
import {
  checkPercentAre100,
  useEffectOnce,
  drawSlices,
  drawSliceWithAnimation
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
  let prevNoActiveSlice = true;
  const slices = React.useRef<Path2D[] | null>(null);
  let canvas: HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas = document.getElementById("pie_chart_canvas") as HTMLCanvasElement ;
    ctxRef.current = canvas?.getContext("2d");
    drawSliceWithAnimation( ctxRef.current, piePercent).then((resolveSlices) => slices.current = resolveSlices);
  });

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;

    if (ctx && slices.current) {
      let changed = false;
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
            changed = true;
          }
        }
      });
      if (changed || noActiveSlice !== prevNoActiveSlice) {
        prevNoActiveSlice = noActiveSlice;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        slices.current = drawSlices(
          ctxRef.current,
          piePercent,
          noActiveSlice ? -1 : activeSliceIndex,
        );
      }
    }
  };

  if (!checkPercentAre100(piePercent)) {
    console.warn("nem adnak 100% ot ki a szeletek");
    return null;
  }

  return (
      <canvas
        id='pie_chart_canvas'
        width={CANVAS_WIDTH}
        height={CANVAS_WIDTH}
        onMouseMove={onMouseMove}
      ></canvas>
  );
};
