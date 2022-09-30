
export const drawNodes =(dataColumns:number[],rowNumbers:number)=>{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      dataColumns.forEach((data,ind,arr)=>{
        const path1 = new Path2D();
        const path2 = new Path2D();
        //pont koordinátái
        const height = (rowNumbers - data) * 40;
        const width = 50 + 100 * ind;

        // coordinates of the next node
        const nextHeight =  (rowNumbers - arr[ind + 1]) * 40;
        const nextWidth = 50 + 100 * (ind + 1);

        //pontok megrajzolása
        // path1.beginPath();
        path1.arc(width, height, 5, 0, 2 * Math.PI);
        ctx.stroke(path1);
        ctx.fill(path1);
        // ctx.closePath();

        //vonalak megrajzolása
        // ctx.beginPath();
        ctx.lineWidth = 3;
        path2.moveTo(width,height);
        path2.lineTo(nextWidth,nextHeight);
        ctx.stroke(path2);
        // ctx.closePath();
        
      })
     
}};