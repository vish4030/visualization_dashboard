import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

import createChartData from "../utils/createChartData.jsx";

function Charts({ dataset, filteredTopic, chartType, dataTopic }) {
  const [topics, setTopics] = useState([]);
  const [flag, setFlag] = useState(true);
  const [chartData, setChartData] = useState(null);

  const handleClick = (e) => {
    setFlag((prevFlag) => !prevFlag);
    if(e.target.innerText == 'All'){
     setTopics((prev) =>filteredTopic);
      return;
    }
    let clicked = e.target.innerText;
      if(clicked !== `SELECT ${dataTopic.toUpperCase()}`)
      {
        setTopics([clicked]);
      }
      
  };

  useEffect(()=>{
    console.log("run")
    if(topics.length>0)
      setChartData((prev)=>createChartData(dataset,topics));
    else
      setChartData((prev)=>createChartData(dataset,filteredTopic));
  },[topics, dataset, filteredTopic])

  return (
    chartData == null ? <h3>Loading...</h3>
    :
    <div>
      <h2>Data Visualization {chartType.toUpperCase()} CHART</h2>
      <div onClick={(e)=>handleClick(e)} className="end-year">
        <h3>Select {dataTopic}</h3>
        <ul className={`flex ${flag && "display-n"}`}>
          <li>All</li>
          {filteredTopic?.map((year,i)=> <li key={i}>{year}</li>)}
        </ul>
      </div>
      <Chart type={chartType} data={chartData} />
      
    </div>
  );
}

export default Charts;
