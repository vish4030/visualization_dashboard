import { useState, useEffect } from "react";
import { Chart as ChartJs } from "chart.js/auto";

import { chartsType } from "../constant";
import Charts from "./components/Charts";


function App() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState(chartsType);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/data");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length < 1) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div className="row">
        {chartType.map((chart, i) => (
          <div key={i + "a"} className="col-6">
            <Charts key={i} data={data} chartType={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
