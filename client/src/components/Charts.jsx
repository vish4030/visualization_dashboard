import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

import createChartData from "../utils/createChartData.jsx";

function Charts({ dataset, filteredYears, chartType }) {
  const [years, setYears] = useState([]);
  const [flag, setFlag] = useState(true);



  const handleClick = (e) => {
    setFlag((prevFlag) => !prevFlag);
    if(e.target.innerText == 'All'){
     setYears((prevFilteredYears) =>filteredYears);
      return;
    }
    const clickedYear = parseInt(e.target.innerText);
    if (!isNaN(clickedYear)){
      setYears([clickedYear])
    };
  };


  const chartData = createChartData(dataset,years.length>0?years:filteredYears)

  
  return (
    <div>
      <h2>Data Visualization BarChart</h2>
      <div onClick={(e)=>handleClick(e)} className="end-year">
        <h3>Select End Year</h3>
        <ul className={`flex ${flag && "display-n"}`}>
          <li>All</li>
          {filteredYears?.map((year,i)=> <li key={i}>{year}</li>)}
        </ul>
      </div>
      {
        chartData == null ? <h3>Chart loading...</h3>
        :<Chart type={chartType} data={chartData} />
      }
      
    </div>
  );
}

export default Charts;
