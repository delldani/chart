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

const RADIUS = 150;
const CANVAS_WIDTH = RADIUS + 200;
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  let stepByStepSlices: number[]  = [];
  const slices = React.useRef<Path2D[]>(piePrecent.map(item=>new Path2D()));
  let canvas:HTMLCanvasElement | null = null;
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );

  useEffectOnce(() => {
    canvas= document.querySelector("canvas");
    ctxRef.current = canvas?.getContext("2d");
    const ctx = ctxRef.current;

    stepByStepSlices = makeStepByStepSlices(piePrecent);
    if(ctx){
      slices.current.forEach((slice,index) => {
        
        const startDegree = percentToDegree(stepByStepSlices[index]);
        const endDegree = slices.current.length-1 === index ? 360 :  percentToDegree(stepByStepSlices[index+1]);
        makeSlice(slice,CANVAS_WIDTH/2,CANVAS_WIDTH/2, startDegree, endDegree, RADIUS);
        //átlátszó legyen a vonal
        ctx.strokeStyle="rgba(0, 0, 0, 0)";
        ctx.stroke(slice);
        (ctx as CanvasFillStrokeStyles).fillStyle = piePrecent[index].color;
        ctx.fill(slice);
      });
    }
  
  });

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if(ctx){
    slices.current.map((slice,index)=>{
        const isPointInPath = ctx.isPointInPath(
          slice,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
          );
          if(isPointInPath ){
            // const startDegree = percentToDegree(stepByStepSlices[index]);
            // const endDegree = slices.current.length-1 === index ? 360 :  percentToDegree(stepByStepSlices[index+1]);
            // makeSlice(slice,CANVAS_WIDTH/2,CANVAS_WIDTH/2, startDegree, endDegree, RADIUS);
            // ctx.stroke(slice);

            (ctx as CanvasFillStrokeStyles).fillStyle = 'black';
            ctx.fill(slice);
          }else{
              (ctx as CanvasFillStrokeStyles).fillStyle = piePrecent[index].color;
            ctx.fill(slice);
          }
        })
      };
  };

  if(!checkPercentAre100(piePrecent)){console.warn('nem adnak 100% ot ki a szeletek'); return null};

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
