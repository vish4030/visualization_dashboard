import { useState, useEffect } from "react";
import { Chart as ChartJs } from "chart.js/auto";

import { chartsType } from "./constant";
import Charts from "./components/Charts";
import { data_year } from "./utils/dataSets/data_year.jsx";
import { data_topic } from "./utils/dataSets/data_topic";
import { data_pestle } from "./utils/dataSets/data_pestle";
import { data_country } from "./utils/dataSets/data_country";
import { data_region } from "./utils/dataSets/data_region";
import { data_sector } from "./utils/dataSets/data_sector";
import { data_source } from "./utils/dataSets/data_source";

function App() {
  const [data, setData] = useState([]);
  const [dataSetsObj, setDataSetsObj] = useState({});
  const [filteredTopic, setFilteredTopic] = useState([]);
  const [chartType, setChartType] = useState(chartsType);
  const [topic, setTopic] = useState("topic");

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/data");
    const json = await res.json();
    setData(json);
    const dataObj = data_topic(json);
    setDataSetsObj((prev) => dataObj.dataSetsObj);
    setFilteredTopic((prev) => dataObj.topic);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let dataObj;
    switch (topic) {
      case "year":
        dataObj = data_year(data);
        break;
      case "topic":
        dataObj = data_topic(data);
        break;
      case "country":
        dataObj = data_country(data);
        break;
      case "pestle":
        dataObj = data_pestle(data);
        break;
      case "region":
        dataObj = data_region(data);
        break;
      case "sector":
        dataObj = data_sector(data);
        break;
      case "source":
        dataObj = data_source(data);
        break;
    }
    if (dataObj != undefined) {
      setDataSetsObj((prev) => dataObj.dataSetsObj);
      setFilteredTopic((prev) => dataObj.topic);
    }
    console.log(dataObj);
  }, [topic]);

  const handleClick = (e) => {
    setTopic(e.target.innerText.toLowerCase());
    console.log(e.target.innerText);
  };

  if (filteredTopic.length < 1) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div className="aside">
        <h2>Dashboard</h2>
        <ul className="" onClick={(e) => handleClick(e)}>
          <li>year</li>
          <li>Topic</li>
          <li>Sector</li>
          <li>Region</li>
          <li>Source</li>
          <li>Country</li>
          <li>Pestle</li>
        </ul>
      </div>
      <div className="row">
        {chartType.map((chart, i) => (
          <div key={i + "a"} className="col-12">
            <Charts
              key={i}
              dataset={dataSetsObj}
              filteredTopic={filteredTopic}
              chartType={chart}
              dataTopic={topic}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
