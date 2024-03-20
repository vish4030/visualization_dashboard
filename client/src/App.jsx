import { useState, useEffect } from "react";
import { Chart as ChartJs } from "chart.js/auto";

import { chartsType } from "../constant";
import Charts from "./components/Charts";
import { dataSets } from "./utils/dataSets/dataSets.jsx";


function App() {
  const [data, setData] = useState([]);
  const [dataSetsObj, setDataSetsObj] = useState({});
  const [filteredYear, setFilteredYear] = useState([])
  const [chartType, setChartType] = useState(chartsType);
  const [filterTopic, setFilterTopic] = useState('years');

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/data");
    const json = await res.json();
    setData(json);
  };

  useEffect(()=>{
    const dataObj = dataSets(data);
    setDataSetsObj((prev)=>dataObj.dataSetsObj)
    setFilteredYear((prev)=> dataObj.filteredYear)
    console.log(dataObj);
  },[data])

  useEffect(() => {
    fetchData();  
  }, []);


  const handleClick = (e)=>{

  }

  if (data.length < 1) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div className="aside">
        <h2>Dashboard</h2>
        <ul className="">
          <li>Topic</li>
          <li>Sector</li>
          <li>Region</li>
          <li>Source</li>
          <li>Country</li>
          <li>City</li>
        </ul>
      </div>
      <div className="row">
        {chartType.map((chart, i) => (
          <div key={i + "a"} className="col-6">
            <Charts key={i} dataset={dataSetsObj.years} filteredYears={filteredYear}  chartType={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
