import { Chart } from "./components/chart/chart";
import React from "react";

function App() {
  const yAxis = ["0", "1", "2", "3", "4", "5", "6"];
  const xAxis = ["2001", "2002", "2003", "2004"];
  // const dataColumns = [
  //   [2.3, 1.5, 3],
  //   [5.2, 3.2, 2.8],
  //   [4, 3.5, 2],
  //   [6.5, 2, 1.5],
  // ];
  const dataColumns = [
    [2.3, 1.5],
    [5.2, 3.2],
    [4, 5],
    [6.5, 2],
  ];
  // const dataColumns = [[2.3],[5.2],[4],[6.5]];
  const piePrecent = [
    { precent: 15, color: "red" },
    { precent: 25, color: "blue" },
    { precent: 30, color: "grey" },
  ];

  const [chart, setChart] = React.useState<"bar" | "line" | "pie">("bar");
  const [chart2, setChart2] = React.useState(false);

  return (
    <div>
      <button onClick={() => setChart2(!chart2)}>változtat2 global</button>
      <button onClick={() => setChart("bar")}>column chart</button>
      <button onClick={() => setChart("line")}>line chart</button>
      <button onClick={() => setChart("pie")}>pie chart</button>
      <Chart
        xAxis={xAxis}
        yAxis={yAxis}
        dataColumns={dataColumns}
        piePrecent={piePrecent}
        chartType={chart}
      />
    </div>
  );
}

export default App;
