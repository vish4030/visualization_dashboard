import { useState, useEffect } from "react"
import {Chart as ChartJs} from 'chart.js/auto';
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PiChat";
import PolarArChart from "./components/PolarAreaChart";
import RadarChart from "./components/RadarChat";
import ScatterChart from "./components/ScatterChart";
import DoughnutChart from "./components/DoughnutChart";
import BubbleChart from "./components/BubbleChart";



function App() {
 
  const [data, setData] = useState([]);

  const fetchData = async()=>{
    const res = await fetch('http://localhost:3000/data');
      const json = await res.json();
      setData(json);
  }
  
  useEffect(()=>{
    fetchData(); 
  },[])

 if(data.length<1)
  return <h1>Loading...</h1>
 return(
    <div className="container">
      <div className="row">
        <div className="col-6"><BarChart data={data}/></div>
        <div className="col-6"><LineChart data={data}/></div>
        <div className="col-6"><ScatterChart data={data}/></div>
        <div className="col-6"><BubbleChart data={data}/></div>
        <div className="col-6"><RadarChart data={data}/></div>
        <div className="col-6"><PolarArChart data={data}/></div>
        <div className="col-6"><PieChart data={data}/></div>
        <div className="col-6"><DoughnutChart data={data}/></div>
      </div>  
    </div>) 
}

export default App;
