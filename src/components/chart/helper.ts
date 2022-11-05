import React from "react";
import { PiePrecentType } from "./chart";

export const drawNodes = (
  dataColumns: number[],
  rowNumbers: number,
  color: string
) => {
  const path2Array: Path2D[] = [];
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
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

export const makePieGradient = (piePrecent:PiePrecentType)=>{
  const percent = piePrecent
    .map((item,ind,array) => {
      return " " + item.color + " " + "0%" + " " + item.precent + "%" + (ind !== array.length-1 ? "," : '');
    })
    .join("");
  return `conic-gradient(from 0deg, ${percent})`;
};

export const checkPercentAre100 = (piePrecent:PiePrecentType)=>{
let sum = 0;
piePrecent.forEach(item=> sum += item.precent);
return sum === 100;
}