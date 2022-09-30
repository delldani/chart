import { Chart } from "./components/chart/chart";
import React from 'react';

function App() {
  const yAxis = ["0", "1", "2", "3", "4", "5", "6"];
  const xAxis = ["2001", "2002", "2003", "2004"];
  // const dataColumns = [[2.3,1.5,3],[5.2,3.2,5],[4,5,2],[6.5,2,1.5]];
  // const dataColumns = [[2.3,1.5],[5.2,3.2],[4,5],[6.5,2]];
  const dataColumns = [[2.3],[5.2],[4],[6.5]];
 

  const [chart,setChart] = React.useState(false)
  const [chart2,setChart2] = React.useState(false)
  return (
    <div>
      <button onClick={()=>setChart2( !chart2)}>változtat2 global</button>
      <button onClick={()=>setChart( !chart)}>változtat</button>
      <Chart xAxis={xAxis} yAxis={yAxis} dataColumns={dataColumns} chartType={chart ?'line' : 'bar'}/>
    </div>
  );
}

export default App;
