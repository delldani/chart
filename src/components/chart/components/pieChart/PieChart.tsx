import React from 'react'; 
import { makePieGradient, checkPercentAre100 } from "../../helper";
import styles from "./PieChart.module.css";
import { PiePrecentType } from "../../chart";
interface PieChartProps {
  piePrecent: PiePrecentType;
}

export const PieChart = (props: PieChartProps) => {
  const { piePrecent } = props;

  React.useEffect(()=>{
    
  
  
  // ctx?.beginPath();
  // ctx.arc(50,50, 50, Math.PI/2,  Math.PI);
  // let portionAngle = 15 * 2 * Math.PI;
  //drawing an arc and a line to the center to differentiate the slice from the rest
  // ctx?.beginPath();
  // ctx?.arc(100, 100, 100, 0,  portionAngle);
  // ctx?.lineTo(100, 100);
  // ctx?.stroke();
  //filling the slices with the corresponding mood's color
  // ctx?.fill();
  
    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
  (ctx as  CanvasFillStrokeStyles).fillStyle = 'red' ;
ctx?.beginPath();
ctx?.moveTo(100,100);
ctx?.lineTo(100, 50);
ctx?.arc(100, 100, 50, 1.5* Math.PI, 1.75* Math.PI);
//0', 10'
ctx?.lineTo(100, 100);
ctx?.stroke();
(ctx as  CanvasFillStrokeStyles).fillStyle = 'red' ;
ctx?.fill();
// ctx?.rotate(45 * Math.PI / 180);
ctx?.translate(50,100);

},[])

const pieGradient = makePieGradient(piePrecent);

  return (
    <>
      <div
        className={styles.gradient}
        style={{
          background: pieGradient,
        }}
      />
      <canvas width="200" height="200"></canvas>
    </>
  );
};
