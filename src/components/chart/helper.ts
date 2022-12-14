import React from "react";
import { PiePercentType } from "./chart";
import { CANVAS_WIDTH, RADIUS } from "./default";

export const drawNodes = (
  dataColumns: number[],
  rowNumbers: number,
  color: string
) => {
  const path2Array: Path2D[] = [];
  const canvas = document.getElementById("canvas_line_chart") as HTMLCanvasElement;
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    dataColumns.forEach((data, ind, arr) => {
      const path1 = new Path2D();
      const path2 = new Path2D();
      path2Array.push(path1);
      //pont koordinátái
      const height = (rowNumbers - data) * 40;
      const width = 50 + 100 * ind;

      // coordinates of the next node
      const nextHeight = (rowNumbers - arr[ind + 1]) * 40;
      const nextWidth = 50 + 100 * (ind + 1);

      ctx.fillStyle = color;
      //pontok megrajzolása
      // path1.beginPath();
      path1.arc(width, height, 5, 0, 2 * Math.PI);
      ctx.stroke(path1);
      ctx.fill(path1);
      // ctx.closePath();

      //vonalak megrajzolása
      // ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      path2.moveTo(width, height);
      path2.lineTo(nextWidth, nextHeight);
      ctx.stroke(path2);

      // ctx.closePath();
    });
  }
  return path2Array;
};

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = React.useRef<void | (() => void)>();
  const effectCalled = React.useRef(false);
  const renderAfterCalled = React.useRef(false);
  const [val, setVal] = React.useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  React.useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};

export const makePieGradient = (piePrecent: PiePercentType) => {
  let sum = 0;
  const percent = piePrecent
    .map((item, ind, array) => {
      sum += item.percent;
      return (
        " " +
        item.color +
        " " +
        "0%" +
        " " +
        sum +
        "%" +
        (ind !== array.length - 1 ? "," : "")
      );
    })
    .join("");
  return `conic-gradient(from 0deg, ${percent})`;
};

export const checkPercentAre100 = (piePrecent: PiePercentType) => {
  let sum = 0;
  piePrecent.forEach((item) => (sum += item.percent));
  return sum === 100;
};

function lineAtAngle(
  x1: number,
  y1: number,
  length: number,
  degree: number,
  path: Path2D
) {
  path.moveTo(x1, y1);
  // const radians = angle * (Math.PI / 180);
  const x2 = x1 + Math.cos(degree) * length;
  const y2 = y1 + Math.sin(degree) * length;
  path.lineTo(x2, y2);
}

const degreeToAngle = (degree: number) => {
  return (1.5 + degree / 180) * Math.PI;
};

export const makeSliceBorder = (
  path: Path2D,
  centerX: number,
  centerY: number,
  startDegree: number,
  endDegree: number,
  radius: number
) => {
  if (endDegree <= startDegree) return null;
  lineAtAngle(centerX, centerY, radius, degreeToAngle(startDegree), path);
  path.arc(
    centerX,
    centerY,
    radius,
    degreeToAngle(startDegree),
    degreeToAngle(endDegree)
  );
  lineAtAngle(centerX, centerY, radius, degreeToAngle(endDegree), path);
};
export const percentToDegree = (percent: number) => (360 * percent) / 100;

// a szelet százalékok átalakítva erre  - [0,20,60,100]
export const makeStepByStepSlices = (piePrecent: PiePercentType) => {
  let step = 0;
  const steps = [0];
  piePrecent.map((item) => {
    step += item.percent;
    steps.push(step);
  });
  return steps;
};

export const getRadius = (defaultRadius: number, activeSlice: boolean) => {
  return activeSlice ? defaultRadius + 20 : defaultRadius;
};


export const drawSlice = (
  ctx: CanvasRenderingContext2D | null | undefined,
  startDegree: number,
  endDegree: number,
  slice: Path2D,
  color:string,
  radius: number,
) => {
  makeSliceBorder(
        slice,
        CANVAS_WIDTH / 2,
        CANVAS_WIDTH / 2,
        startDegree,
        endDegree,
        radius
      );
  paintSlice(ctx,slice,color);
};

const getStartandEndDegree = (slicesNumber : number,index:number, degreeToDegreeArray: number[])=>{
  

    const startDegree = percentToDegree(degreeToDegreeArray[index]);
    const endDegree =
    slicesNumber - 1 === index
        ? 360
        : percentToDegree(degreeToDegreeArray[index + 1]);
      return {startDegree,endDegree};
}

export const drawSliceWithAnimation = (
  ctx: CanvasRenderingContext2D | null | undefined,
  piePercent: PiePercentType,
) => {
return new Promise< Path2D[]>((resolve,reject)=>{

  const slices = piePercent.map((item) => new Path2D());
  const degreeToDegreeArray: number[] = makeStepByStepSlices(piePercent);

    
    let sliceIndex = 0;
    
    const recursive = ()=>{
      
      const {startDegree,endDegree} = getStartandEndDegree(slices.length,sliceIndex,degreeToDegreeArray);
      let growingEndDergree = startDegree + 1 ;
      const intervalID = setInterval(function () {
        
        drawSlice(ctx,startDegree,growingEndDergree,slices[sliceIndex],piePercent[sliceIndex].color,RADIUS);
        
        if (growingEndDergree++ === endDegree) {
          window.clearInterval(intervalID);
          sliceIndex++;
          if(sliceIndex < slices.length){
            recursive()
          }else{
            resolve(slices);
          };
        }
      }, 10);
    };
  recursive();
});
};


export const drawSlices = (
  ctx: CanvasRenderingContext2D | null | undefined,
  piePercent: PiePercentType,
  activeSliceIndex: number,
) => {
  const slices = piePercent.map((item) => new Path2D());
    const degreeToDegreeArray: number[] = makeStepByStepSlices(piePercent);
    slices.forEach((slice, index) => {
      const radius = getRadius(RADIUS, activeSliceIndex === index);

      const startDegree = percentToDegree(degreeToDegreeArray[index]);
      const endDegree =
        slices.length - 1 === index
          ? 360
          : percentToDegree(degreeToDegreeArray[index + 1]);
          drawSlice(ctx,startDegree,endDegree,slice,piePercent[index].color,radius) ;
    });
    
  return slices;
};

export const paintSlice = (
  ctx: CanvasRenderingContext2D | null | undefined,
  slice: Path2D,
  color:string,
) => {
  if (ctx) {
      //átlátszó legyen a vonal
      ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      ctx.stroke(slice);
      (ctx as CanvasFillStrokeStyles).fillStyle = color;
      ctx.fill(slice);
  }
};
