import React from "react";
import {
  makePieGradient,
  checkPercentAre100,
  useEffectOnce,
  makeSlice,
  percentToDegree,
  makeStepByStepSlices
} from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";

const RADIUS = 50;
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  const slices = React.useRef<Path2D[]>(piePrecent.map(item=>new Path2D()));
  let canvas:HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas= document.querySelector("canvas");
    ctxRef.current = canvas?.getContext("2d");
    const ctx = ctxRef.current;

    const stepByStepSlices = makeStepByStepSlices(piePrecent);

    slices.current.forEach((slice,index) => {

        const startDegree = percentToDegree(stepByStepSlices[index]);
        const endDegree = slices.current.length-1 === index ? 360 :  percentToDegree(stepByStepSlices[index+1]);
        makeSlice(slice, startDegree, endDegree, RADIUS);
        ctx?.stroke(slice);
        (ctx as CanvasFillStrokeStyles).fillStyle = piePrecent[index].color;
        ctx?.fill(slice);
      });
  
  });

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    slices.current.map((slice,index)=>{
      if(ctxRef.current){
        const isPointInPath = ctxRef.current.isPointInPath(
          slice,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
          );
          if(isPointInPath )console.log(piePrecent[index].color)
        };
    })
  };

  if(!checkPercentAre100(piePrecent)){console.log('nem adnak 100% ot ki a szeletek'); return null};

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
      ></canvas>
    </>
  );
};
