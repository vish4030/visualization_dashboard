import React, { useEffect, useState, useRef } from "react";
import { Scatter } from "react-chartjs-2";

import dataSets from "../utils/dataSets.jsx";

function ScatterChart({ data }) {
  const [years, setYears] = useState([]);
  const[fixedYears, setFixedYears] = useState([]);
  const [dataset, setDataset] = useState({});
  const [flag, setFlag] = useState(true);
  const myRef = useRef(null);


  const handleClick = (e) => {
    setFlag((prevFlag) => !prevFlag);
    if(e.target.innerText == 'All'){
      setYears((prevYears) => fixedYears.filter((year) => year !== "All"));
      return;
    }
    const clickedYear = parseInt(e.target.innerText);
    if (!isNaN(clickedYear)){
      setYears([clickedYear])
    };
  };


  useEffect(() => {
    const yearAndData = dataSets(data);
    setYears(yearAndData.filteredYear);
    setDataset(yearAndData.datasetObj);
    setFixedYears([...yearAndData.filteredYear,"All"]);
    myRef.current.addEventListener("click", handleClick);

    return () => {
      myRef.current.removeEventListener("click", handleClick);
    };
  }, []);
  // Prepare data for visualization
  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        backgroundColor: "#48249c7f",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years.map(
          (year) =>
            dataset.intensity[year].sum / dataset.intensity[year].arr.length
        ),
      },
      {
        label: "Likelihood",
        backgroundColor: "#fb17a07e",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years.map(
          (year) =>
            dataset.likelihood[year].sum / dataset.likelihood[year].arr.length
        ),
      },
      {
        label: "Relevance",
        backgroundColor: "#1c5f117e",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years.map(
          (year) =>
            dataset.relevance[year].sum / dataset.relevance[year].arr.length
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Data Visualization ScatterChart </h2>
      <div ref={myRef} className="end-year">
        <h3>Select End Year</h3>
        <ul className={`flex ${flag && "display-n"}`}>
          {fixedYears.length>1 && fixedYears.map((year,i)=> <li key={i}>{year}</li>)}
        </ul>
      </div>
      <Scatter data={chartData} />
    </div>
  );
}

export default ScatterChart;
