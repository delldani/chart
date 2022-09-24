import { Chart } from "./components/chart/chart";

function App() {
  const yAxis = ["1", "2", "3", "4", "5", "6", "7"];
  const xAxis = ["2001", "2002", "2003", "2004"];
  return (
    <div>
      <Chart xAxis={xAxis} yAxis={yAxis} />
    </div>
  );
}

export default App;
