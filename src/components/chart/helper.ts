
export const drawNodes =(dataColumns:number[],rowNumbers:number)=>{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      dataColumns.forEach((data,ind,arr)=>{

        //pont koordinátái
        const height = (rowNumbers - data) * 40;
        const width = 50 + 100 * ind;

        // coordinates of the next point
        const nextHeight =  (rowNumbers - arr[ind + 1]) * 40;
        const nextWidth = 50 + 100 * (ind + 1);

        //pontok megrajzolása
        ctx.beginPath();
        ctx.arc(width, height, 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //vonalak megrajzolása
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(width,height);
        ctx.lineTo(nextWidth,nextHeight);
        ctx.stroke();
        ctx.closePath();
        
      })
     
}};