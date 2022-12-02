import React from "react";
import { makePieGradient, checkPercentAre100 ,useEffectOnce} from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  const sliceRef = React.useRef<Path2D>(new Path2D());
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null) ; 
  const ctxRef = React.useRef<CanvasRenderingContext2D | null | undefined>(null); 

  function lineAtAngle(x1:number, y1:number, length:number, angle:number, canvas: CanvasRenderingContext2D ) {    
    canvas.moveTo(x1, y1);  
    const radians = angle * (Math.PI/180);     
    const x2 = x1 + Math.cos(radians ) * length;	 
    const y2 = y1 + Math.sin(radians ) * length;	   
    canvas.lineTo(x2, y2);       
    canvas.stroke();
}

useEffectOnce(() => {
  canvasRef.current = document.querySelector("canvas");
  ctxRef.current  = canvasRef.current?.getContext("2d");
  const ctx = ctxRef.current;
  const slice = sliceRef.current;
  if(ctx && slice){
      console.log('effect');

    ctx.beginPath();
    slice?.moveTo(100, 100);
    slice?.lineTo(100, 50);
    slice?.arc(100, 100, 50, 1.5 * Math.PI, 1.75 * Math.PI);
    //0', 10'
    slice?.lineTo(100, 100);
    ctx.stroke(slice);
    (ctx as CanvasFillStrokeStyles).fillStyle = "red";
    ctx.fill(slice);

    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(150,150);
    ctx.stroke();
   
    lineAtAngle(100,100,50,45,ctx)
    // ctx?.rotate(45 * Math.PI / 180);
    // ctx?.translate(50,100);
  }
  });

  const pieGradient = makePieGradient(piePrecent);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const slice = sliceRef.current;
    if(ctxRef.current){
      const isPointInPath = ctxRef.current.isPointInPath(
        slice,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
        );
        console.log(isPointInPath);
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
